import { useState } from "react";

interface Props {
  data: any;
  onNext: (data: any) => void;
  onBack?: () => void;
}

export default function Step1Personal({ data, onNext, onBack }: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
    parentName: "",
    phone: "",
    email: "",
    ...data,
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.dob) newErrors.dob = "Date of birth is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.parentName) newErrors.parentName = "Parent/Guardian name is required";
    if (!form.phone) newErrors.phone = "Contact number is required";
    if (!form.email) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext(form);
    }
  };

  return (
<div className="bg-white border rounded-xl mx-2 sm:mx-0">
      {/* FORM BODY */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <h2 className="text-lg font-semibold">Student Personal Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 sm:px-4 py-2"
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.dob && (
              <p className="text-xs text-red-500 mt-1">{errors.dob}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Residential Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              rows={3}
              placeholder="Enter complete address"
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          {/* Parent Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Parent / Guardian Name <span className="text-red-500">*</span>
            </label>
            <input
              name="parentName"
              value={form.parentName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter parent name"
            />
            {errors.parentName && (
              <p className="text-xs text-red-500 mt-1">{errors.parentName}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter contact number"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER ACTION BAR (like Image-1 & 2) */}
      <div className="
  flex flex-col sm:flex-row
  gap-3 sm:gap-0
  sm:items-center sm:justify-between
  border-t px-4 sm:px-6 py-4
">
        <button
          disabled
          className="w-full sm:w-auto px-4 py-2 rounded-lg border text-gray-400 cursor-not-allowed">
          Previous
        </button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <button className="w-full sm:w-auto px-4 py-2 rounded-lg border">
            Save Draft
          </button>

          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-blue-600 text-white">
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}
