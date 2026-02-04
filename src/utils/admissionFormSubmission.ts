import { uploadToSpaces } from './uploadToSpaces';
import { AdmissionFormState } from '../store/slices/admissionFormSlice';
import axios from 'axios';

/**
 * Upload all document files to DO Spaces
 * @param formState - The current admission form state
 * @param onProgress - Optional callback for upload progress
 * @returns Object with uploaded document URLs
 */
export const uploadAdmissionDocuments = async (
    formState: AdmissionFormState,
    onProgress?: (field: string, progress: number) => void
): Promise<{
    birth_certificate: string | null;
    tc_certificate: string | null;
    passport_size_photo: string | null;
    address_proof: string | null;
}> => {
    const uploadedUrls: any = {
        birth_certificate: formState.birth_certificate,
        tc_certificate: formState.tc_certificate,
        passport_size_photo: formState.passport_size_photo,
        address_proof: formState.address_proof,
    };

    try {
        // Upload birth certificate if file exists and not yet uploaded
        if (formState.birth_certificate_file && !formState.birth_certificate) {
            if (onProgress) onProgress('birth_certificate', 0);
            uploadedUrls.birth_certificate = await uploadToSpaces(
                formState.birth_certificate_file,
                'admission/documents'
            );
            if (onProgress) onProgress('birth_certificate', 100);
        }

        // Upload TC certificate if file exists and not yet uploaded
        if (formState.tc_certificate_file && !formState.tc_certificate) {
            if (onProgress) onProgress('tc_certificate', 0);
            uploadedUrls.tc_certificate = await uploadToSpaces(
                formState.tc_certificate_file,
                'admission/documents'
            );
            if (onProgress) onProgress('tc_certificate', 100);
        }

        // Upload passport photo if file exists and not yet uploaded
        if (formState.passport_size_photo_file && !formState.passport_size_photo) {
            if (onProgress) onProgress('passport_size_photo', 0);
            uploadedUrls.passport_size_photo = await uploadToSpaces(
                formState.passport_size_photo_file,
                'admission/photos'
            );
            if (onProgress) onProgress('passport_size_photo', 100);
        }

        // Upload address proof if file exists and not yet uploaded
        if (formState.address_proof_file && !formState.address_proof) {
            if (onProgress) onProgress('address_proof', 0);
            uploadedUrls.address_proof = await uploadToSpaces(
                formState.address_proof_file,
                'admission/documents'
            );
            if (onProgress) onProgress('address_proof', 100);
        }

        return uploadedUrls;
    } catch (error) {
        console.error('Error uploading documents:', error);
        throw error;
    }
};

/**
 * Submit the admission form with uploaded documents
 * @param formState - The current admission form state
 * @param documentUrls - The uploaded document URLs
 * @returns API response
 */
export const submitAdmissionForm = async (
    formState: AdmissionFormState,
    documentUrls: {
        birth_certificate: string | null;
        tc_certificate: string | null;
        passport_size_photo: string | null;
        address_proof: string | null;
    }
) => {
    try {
        // Prepare the payload
        const payload = {
            // Student Information
            student_name: formState.student_name,
            date_of_birth: formState.date_of_birth,
            gender: formState.gender,
            address: formState.address,

            // Parent/Guardian Information
            parent_name: formState.parent_name,
            parent_number: formState.parent_number,
            parent_email: formState.parent_email,

            // Academic Information
            class_applied_id: formState.class_applied_id,
            quota_category: formState.quota_category,
            previous_school: formState.previous_school || null,
            last_year_grade: formState.last_year_grade || null,
            year_of_passing: formState.year_of_passing ? parseInt(formState.year_of_passing) : null,
            academic_achievements: formState.academic_achievements || null,
            reason_for_transfer: formState.reason_for_transfer || null,

            // Document URLs
            birth_certificate: documentUrls.birth_certificate,
            tc_certificate: documentUrls.tc_certificate,
            passport_size_photo: documentUrls.passport_size_photo,
            address_proof: documentUrls.address_proof,

            // Metadata
            addmission_number: formState.addmission_number,
            admission_status: formState.admission_status,
            is_active: formState.is_active,
        };

        // Submit to backend (public endpoint - no auth required)
        const response = await axios.post(
            'https://sms-iqc8.onrender.com/api/v1/psms/admission/public-admissions',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error('Error submitting admission form:', error);
        throw new Error(
            error.response?.data?.message || 'Failed to submit admission form'
        );
    }
};

/**
 * Complete admission form submission flow:
 * 1. Upload documents to DO Spaces
 * 2. Submit form with document URLs
 * @param formState - The current admission form state
 * @param onProgress - Optional callback for upload progress
 * @returns API response
 */
export const completeAdmissionSubmission = async (
    formState: AdmissionFormState,
    onProgress?: (field: string, progress: number) => void
) => {
    try {
        // Step 1: Upload all documents
        const documentUrls = await uploadAdmissionDocuments(formState, onProgress);

        // Step 2: Submit form with document URLs
        const response = await submitAdmissionForm(formState, documentUrls);

        return { success: true, data: response };
    } catch (error: any) {
        console.error('Complete admission submission error:', error);
        return {
            success: false,
            error: error.message || 'Submission failed',
        };
    }
};
