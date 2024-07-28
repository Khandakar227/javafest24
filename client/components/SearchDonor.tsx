import { BloodGroups } from "@/lib/const"
import { FaSearch } from "react-icons/fa"
import LocationSearchBar from "./LocationSearchBar";
import { FormEvent, useState } from "react";
import { Address } from "@/types";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

function SearchDonor() {
    const [address, setAddress] = useState<Address|null>(null);
    const router = useRouter();
    const [bloodGroup, setBloodGroup] = useState<string>("");
    const handleLocationSelect = (data: { lat?: number; lng?: number; name: string }) => {
        console.log(data);
        setAddress({
            location: [data.lng || 0, data.lat || 0],
            name: data.name
        });
    }
    
    const onSelectBloodGroup = (e:FormEvent<HTMLSelectElement>) => {
        setBloodGroup((e.target as HTMLSelectElement).value);
    }

    function search(e:FormEvent) {
        e.preventDefault();
        console.log({address, bloodGroup});
        if(!bloodGroup) return toast.error("Please select a blood group");
        if(!address?.location.length) return;
        router.push(`/blood-bank/search?bloodGroup=${bloodGroup}&lng=${encodeURIComponent(address?.location[0])}&lat=${encodeURIComponent(address?.location[1])}&name=${address?.name}`);
    }
  return (
    <form onSubmit={search} className="text-center w-full">
        <select name="bloodGroup" id="bloodGroup" onChange={onSelectBloodGroup} defaultValue={bloodGroup} className="shadow border text-sm rounded-md outline-none px-4 py-2 my-3 mx-auto">
            <option value="">Select Blood Group</option>
            {
            BloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)
            }
        </select>
        <div className="flex justify-center items-stretch gap-4 w-full">
            <LocationSearchBar handleLocation={handleLocationSelect}/>
            <button className="p-2 rounded bg-red-400 shadow"><FaSearch size={22}/></button>
        </div>
    </form>
  )
}

export default SearchDonor