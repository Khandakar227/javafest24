import {  } from "@/lib/api-client";
import { FormEvent, useEffect, useState } from "react";
import { getDistinctGenerics } from '@/lib/api-client'
import { AutoCompleteTextInput } from "./AutoCompleteTextInput";

const medicineFormFields = [
    { label: 'Brand Name', key: 'brandName', element: 'input', required: true },
    { label: 'Dosage Form', key: 'dosageForm', element: 'input', required: true },
    { label: 'Generic', key: 'generic', type: 'search',  element: 'input', required: true },
    { label: 'ID', key: 'id', element: 'input', required: true },
    { label: 'Manufacturer', key: 'manufacturer', element: 'input', required: true },
    { label: 'Price', key: 'price', element: 'input', required: true },
    { label: 'Slug', key: 'slug', element: 'input', required: false },
    { label: 'Strength', key: 'strength', element: 'input', required: true },
    { label: 'Type', key: 'type', element: 'input', required: true },
  ];

export default function MedicineForm() {
  const [loading, setLoading] = useState(false);
  const [genericNames, setGenericNames] = useState<string[]>([]);

  useEffect(() => {
        getDistinctGenerics().then(res => {
            setGenericNames(res);
        }).catch(err => console.log(err));
    }, [])
    
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Handle the form submission here
  }
    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl pb-4 font-semibold"> Add New Generic Information </h2>
            {medicineFormFields.map(field => (
                <div key={field.key} className="form-group">
                    {field.element === 'input' && field.type == 'search' ? (
                        <AutoCompleteTextInput suggestions={genericNames} placeholder={field.label} name={field.key} required={field.required} type="text" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    )
                        : field.element == 'input' ? (
                            <input
                                type={field.type ? field.type : "text"}
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder={field.label}
                                name={field.key}
                                id={field.key}
                                required={field.required}
                            />
                        ) : (
                            <textarea
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder={field.label}
                                name={field.key}
                                id={field.key}
                                required={field.required}
                            />
                        )}
                </div>
            ))}
            <div className="mt-4">
                <button type="submit" className="bg-primary px-4 py-2 rounded" disabled={loading}>
                    {loading ? 'Loading...' : 'Add'}
                </button>
            </div>
        </form>
    )
  }
  