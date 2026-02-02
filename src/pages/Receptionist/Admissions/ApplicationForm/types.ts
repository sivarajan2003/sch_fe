
export interface PersonalDetails {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    address: string;
    parentName: string;
    phone: string;
    email: string;
    class: string; 
  }
  
  export interface AdmissionApplication {
    personal: any;
    academic: any;
    previousSchool: any;
    documents: any;
  }
  
  export interface AcademicDetails {
    applyingClass: string;
    stream: string;
    quota: string;
    achievements: string;
  }
  
  export interface PreviousSchoolDetails {
    schoolName: string;
    lastClass: string;
    yearCompleted: string;
    reason: string;
  }
  
  export interface DocumentsDetails {
    birthCert: File | null;
    leavingCert: File | null;
    photo: File | null;
    addressProof: File | null;
  }
  
  export interface ApplicationData {
    personal: PersonalDetails;
    academic: AcademicDetails;
    previousSchool: PreviousSchoolDetails;
    documents: DocumentsDetails;
  }
  