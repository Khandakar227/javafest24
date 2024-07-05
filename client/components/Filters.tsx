import { districts, medical_specialties } from "@/lib/doctor-data";

export default function Filters() {
    return (
        <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center text-sm">
                <label htmlFor="specialty" className="mr-2">Specialty</label>
                <select name="specialty" id="specialty" className="px-4 py-2 rounded-md shadow outline-none">
                    <option value="all">All</option>
                    {
                        medical_specialties.map(s => s.subspecialties.map(ss => <option value={ss} key={ss}>{ss}</option>))
                    }
                </select>
            </div>
            <div className="flex items-center text-sm">
                <label htmlFor="location" className="mr-2">District</label>
                <select name="location" id="location" className="px-4 py-2 rounded-md shadow outline-none">
                    <option value="all">All</option>
                    {districts.map(d => <option value={d} key={d}>{d}</option>)}
                </select>
            </div>
            <div className="flex items-center text-sm">
                <label htmlFor="sort" className="mr-2">Sort By</label>
                <select name="sort" id="sort" className="px-4 py-2 rounded-md shadow outline-none">
                    <option value="all">All</option>
                    <option value="name">Name</option>
                    <option value="district">District</option>
                    <option value="speciality">Speciality</option>
                </select>
            </div>
        </div>
    )
}
