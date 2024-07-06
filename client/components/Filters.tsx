import { districts, medical_specialties } from "@/lib/doctor-data";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";

export default function Filters() {
    const router = useRouter();
    const [speciality, setSpeciality] = useState('');
    const [district, setDistrict] = useState('');
    const [sortField, setSortField] = useState('name');
    const [direction, setDirection] = useState<'ASC' | 'DESC'>('ASC');

    useEffect(() => {
        if (router.query.speciality) setSpeciality(router.query.speciality as string)
        else setSpeciality('')

        if (router.query.district) setDistrict(router.query.district as string)
        else setDistrict('')

    }, [router.query])

    function onSpecialityChange(e: ChangeEvent) {
        const selected = (e.target as HTMLSelectElement).value;
        if (selected == 'all') {
            const query = router.query;
            delete query['speciality'];

            router.push({ pathname: router.pathname, query })
        }
        else
            router.push({ pathname: router.pathname, query: { ...router.query, speciality: selected, page: 1 } })
    }

    function onDistrictChange(e: ChangeEvent) {
        const selected = (e.target as HTMLSelectElement).value;
        if (selected == 'all') {
            const query = router.query;
            delete query['district'];
            router.push({ pathname: router.pathname, query })
        }
        else
            router.push({ pathname: router.pathname, query: { ...router.query, district: selected, page: 1 } })
    }

    function onSortBy(e:ChangeEvent) {
        const selected = (e.target as HTMLSelectElement).value;
        router.push({ pathname: router.pathname, query: { ...router.query, sortField: selected } })        
    }

    function changeDirection(e: MouseEvent) {
        const newDirection = direction == 'ASC' ? 'DESC' : 'ASC';
        setDirection(newDirection);
        router.push({ pathname: router.pathname, query: { ...router.query, direction: newDirection } })
     }

    return (
        <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center text-sm">
                <label htmlFor="specialty" className="mr-2">Specialty</label>
                <select name="specialty" id="specialty" className="px-4 py-2 rounded-md shadow outline-none" value={!speciality ? 'all' : speciality} onChange={onSpecialityChange}>
                    <option value="all">All</option>
                    {
                        medical_specialties.map(ss => <option value={ss.value} key={ss.label}>{ss.label}</option>)
                    }
                </select>
            </div>
            <div className="flex items-center text-sm">
                <label htmlFor="location" className="mr-2">District</label>
                <select name="location" id="location" className="px-4 py-2 rounded-md shadow outline-none" value={!district ? 'all' : district} onChange={onDistrictChange}>
                    <option value="all">All</option>
                    {districts.map(d => <option value={d} key={d}>{d}</option>)}
                </select>
            </div>
            <div className="flex items-center text-sm gap-4 justify-between">
                <div className="flex items-center text-sm gap-4 justify-between">
                    <label htmlFor="sort" className="mr-2">Sort By</label>
                    <select name="sort" id="sort" className="px-4 py-2 rounded-md shadow outline-none" onChange={onSortBy}>
                        <option value="name">Name</option>
                        <option value="district">District</option>
                        <option value="speciality">Speciality</option>
                    </select>
                </div>
                <button onClick={changeDirection} className="text-green-700">{
                    direction == 'ASC' ? <HiSortAscending size={25} /> :
                        <HiSortDescending size={25} />
                }</button>
            </div>
        </div>
    )
}
