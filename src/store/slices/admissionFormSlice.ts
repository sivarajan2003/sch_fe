import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AdmissionFormState {
    // Step 1: Student Information
    student_name: string;
    date_of_birth: string;
    gender: string;
    address: string;

    // Step 2: Parent/Guardian Information
    parent_name: string;
    parent_number: string;
    parent_email: string;

    // Step 3: Academic Information
    class_applied_id: string;
    quota_category: string;
    previous_school: string;
    last_year_grade: string;
    year_of_passing: string;
    academic_achievements: string;
    reason_for_transfer: string;

    // Step 4: Document Uploads (URLs after upload to DO Spaces)
    birth_certificate: string | null;
    tc_certificate: string | null;
    passport_size_photo: string | null;
    address_proof: string | null;

    // File objects (temporary, for preview before upload)
    birth_certificate_file: File | null;
    tc_certificate_file: File | null;
    passport_size_photo_file: File | null;
    address_proof_file: File | null;

    // Form metadata
    addmission_number: string;
    admission_status: string;
    is_active: boolean;
    currentStep: number;
    uploadProgress: {
        birth_certificate: number;
        tc_certificate: number;
        passport_size_photo: number;
        address_proof: number;
    };
}

const initialState: AdmissionFormState = {
    // Step 1
    student_name: '',
    date_of_birth: '',
    gender: '',
    address: '',

    // Step 2
    parent_name: '',
    parent_number: '',
    parent_email: '',

    // Step 3
    class_applied_id: '',
    quota_category: '',
    previous_school: '',
    last_year_grade: '',
    year_of_passing: '',
    academic_achievements: '',
    reason_for_transfer: '',

    // Step 4
    birth_certificate: null,
    tc_certificate: null,
    passport_size_photo: null,
    address_proof: null,

    birth_certificate_file: null,
    tc_certificate_file: null,
    passport_size_photo_file: null,
    address_proof_file: null,

    // Metadata
    addmission_number: '',
    admission_status: 'Pending',
    is_active: true,
    currentStep: 1,
    uploadProgress: {
        birth_certificate: 0,
        tc_certificate: 0,
        passport_size_photo: 0,
        address_proof: 0,
    },
};

const admissionFormSlice = createSlice({
    name: 'admissionForm',
    initialState,
    reducers: {
        // Update any field in the form
        updateField: (state, action: PayloadAction<{ field: keyof AdmissionFormState; value: any }>) => {
            const { field, value } = action.payload;
            (state as any)[field] = value;
        },

        // Update multiple fields at once
        updateMultipleFields: (state, action: PayloadAction<Partial<AdmissionFormState>>) => {
            return { ...state, ...action.payload };
        },

        // Set document file for preview
        setDocumentFile: (
            state,
            action: PayloadAction<{ field: 'birth_certificate' | 'tc_certificate' | 'passport_size_photo' | 'address_proof'; file: File | null }>
        ) => {
            const { field, file } = action.payload;
            (state as any)[`${field}_file`] = file;
        },

        // Set document URL after upload
        setDocumentUrl: (
            state,
            action: PayloadAction<{ field: 'birth_certificate' | 'tc_certificate' | 'passport_size_photo' | 'address_proof'; url: string }>
        ) => {
            const { field, url } = action.payload;
            state[field] = url;
        },

        // Update upload progress
        setUploadProgress: (
            state,
            action: PayloadAction<{ field: 'birth_certificate' | 'tc_certificate' | 'passport_size_photo' | 'address_proof'; progress: number }>
        ) => {
            const { field, progress } = action.payload;
            state.uploadProgress[field] = progress;
        },

        // Navigate between steps
        setCurrentStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
        },

        nextStep: (state) => {
            if (state.currentStep < 4) {
                state.currentStep += 1;
            }
        },

        previousStep: (state) => {
            if (state.currentStep > 1) {
                state.currentStep -= 1;
            }
        },

        // Generate admission number
        generateAdmissionNumber: (state) => {
            const timestamp = Date.now();
            const random = Math.floor(Math.random() * 10000);
            state.addmission_number = `ADM-${timestamp}${random}`;
        },

        // Reset form
        resetForm: () => initialState,

        // Reset only file-related fields
        resetDocuments: (state) => {
            state.birth_certificate = null;
            state.tc_certificate = null;
            state.passport_size_photo = null;
            state.address_proof = null;
            state.birth_certificate_file = null;
            state.tc_certificate_file = null;
            state.passport_size_photo_file = null;
            state.address_proof_file = null;
            state.uploadProgress = {
                birth_certificate: 0,
                tc_certificate: 0,
                passport_size_photo: 0,
                address_proof: 0,
            };
        },
    },
});

export const {
    updateField,
    updateMultipleFields,
    setDocumentFile,
    setDocumentUrl,
    setUploadProgress,
    setCurrentStep,
    nextStep,
    previousStep,
    generateAdmissionNumber,
    resetForm,
    resetDocuments,
} = admissionFormSlice.actions;

export default admissionFormSlice.reducer;
