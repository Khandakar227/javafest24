import { getDistinctDrugClasses } from "@/lib/api-client";
import { FormEvent, useEffect, useState } from "react";
import { AutoCompleteTextInput } from "./AutoCompleteTextInput";

const genericFormFields = [
    { label: 'Name', key: 'name', element: 'input', required: true },
    { label: 'Slug', key: 'slug', element: 'input', required: true },
    { label: 'Drug Class', key: 'drugClass', type: 'search', element: 'input', required: false },
    { label: 'Indication', key: 'indication', element: 'input', required: false },
    { label: 'Indication Description', key: 'indicationDescription', element: 'textarea', required: false },
    { label: 'Therapeutic Class Description', key: 'therapeuticClassDescription', element: 'textarea', required: false },
    { label: 'Pharmacology Description', key: 'pharmacologyDescription', element: 'textarea', required: false },
    { label: 'Dosage Description', key: 'dosageDescription', element: 'textarea', required: false },
    { label: 'Administration Description', key: 'administrationDescription', element: 'textarea', required: false },
    { label: 'Interaction Description', key: 'interactionDescription', element: 'textarea', required: false },
    { label: 'Contraindications Description', key: 'contraindicationsDescription', element: 'textarea', required: false },
    { label: 'Side Effects Description', key: 'sideEffectsDescription', element: 'textarea', required: false },
    { label: 'Pregnancy and Lactation Description', key: 'pregnancyAndLactationDescription', element: 'textarea', required: false },
    { label: 'Precautions Description', key: 'precautionsDescription', element: 'textarea', required: false },
    { label: 'Pediatric Usage Description', key: 'pediatricUsageDescription', element: 'textarea', required: false },
    { label: 'Overdose Effects Description', key: 'overdoseEffectsDescription', element: 'textarea', required: false },
    { label: 'Storage Conditions Description', key: 'storageConditionsDescription', element: 'textarea', required: false },
];

export default function GenericForm() {
    const [loading, setLoading] = useState(false);
    const [drugClasses, setDrugClasses] = useState<string[]>([]);
    
    useEffect(() => {
        getDistinctDrugClasses().then(res => {
            setDrugClasses(res);
        }).catch(err => console.log(err));
    }, [])

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
        console.log(data);
        setLoading(true)


        // .then(response => {
        //     if (response.error) return toast.error(response.error);
        //     (e.target as HTMLFormElement).reset();
        //     setAddresses([]);
        //     toast.success("Donor added successfully!");
        // })
        // .catch(err => {
        //     toast.error(err.message);
        //     console.log(err)
        // })
        // .finally(() => setLoading(false));
    }
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-xl pb-4 font-semibold"> Add New Generic Information </h2>
            {genericFormFields.map(field => (
                <div key={field.key} className="form-group">
                    {field.element === 'input' && field.type == 'search' ? (
                        <AutoCompleteTextInput suggestions={drugClasses} placeholder={field.label} name={field.key} required={field.required} type="text" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
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
    );
}

