import { useState, useEffect, FormEvent } from "react";
import Layout from "@/components/Layout";
import { useUser, userUserLoaded } from "@/hooks/user";
import Head from "next/head";
import { useRouter } from "next/router";
import { registerDonor, searchDonorsByCity } from "@/lib/api-client";
import { cities, divisions } from "@/lib/const";
import GoogleMapComponent from "@/components/GoogleMap";



const BloodGroups = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];




export default function Add() {
  const [user, setUser] = useUser();
  const [userLoaded, _] = userUserLoaded();
  const router = useRouter();

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [donors, setDonors] = useState<any[]>([]);

  useEffect(() => {
    if (!userLoaded) return;
    if (!user) {
      alert("You must be logged in!");
      router.push("/login");
    }
  }, [userLoaded, user]);

  function handleDivisionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const division = event.target.value;
    setSelectedDivision(division);
    const districts = divisions.find(d => d.name === division)?.districts || [];
    setDistrictOptions(districts);
    setSelectedDistrict("");
    setCityOptions([]);
  }

  function handleDistrictChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const district = event.target.value;
    setSelectedDistrict(district);
    const citiesList = cities[district] || [];
    setCityOptions(citiesList);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    const response = await registerDonor(data);

    if (response.error) {
      setMessage(`Registration failed: ${response.error}`);
    } else {
      setMessage("Registration successful! Thank you for registering.");
      setRegistrationSuccessful(true);
    }
  }
  
  async function handleLocationSelect(city: string) {
    setSelectedCity(city);
    const response = await searchDonorsByCity(city);
    if (response.error) {
      setMessage(`Error fetching donors: ${response.error}`);
    } else {
      setDonors(response);
    }
  }

  return (
    <>
      <Head>
        <title>Blood Bank - Cerena</title>
      </Head>

      <Layout>
        <div className="shadow rounded-md px-4 py-12 m-4 bg-white">
          <p className="text-lg text-center">Add necessary information of the donor.<br />
            For verification, a <b>verification link</b> will be sent to donor's <b>mobile number</b>
          </p>
        </div>

        <div className="shadow rounded-md px-4 py-12 m-4 bg-white">
          {message && (
            <div className={`text-center py-4 px-4 ${registrationSuccessful ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-md`}>
              {message}
            </div>
          )}
          {!registrationSuccessful && (
            <form onSubmit={onSubmit} className="mx-auto max-w-2xl">
              <input type="text" className="shadow border w-full rounded-md outline-none px-4 py-2 my-3" placeholder="Full Name" name="fullName" id="fullName" required />
              <select name="gender" id="gender" className="w-full shadow rounded border py-2 px-4 my-3">
                <option value="">Select Gender</option>
                {['Male', 'Female'].map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <select name="bloodGroup" id="bloodGroup" className="w-full shadow rounded border py-2 px-4 my-3" required>
                <option value="">Select Blood Type</option>
                {BloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
              <input type="tel" name="mobileNo" id="mobileNo" placeholder="Phone Number" className="shadow border w-full rounded-md outline-none px-4 py-2 my-3" required />
              <input type="number" min={12} name="age" id="age" placeholder="Your Age" className="shadow border w-full rounded-md outline-none px-4 py-2 my-3" required />
              
              <textarea name="address" id="address" placeholder="Address" className="shadow border w-full rounded-md outline-none px-4 py-2 my-3" required></textarea>
              
              <select name="division" id="division" className="w-full shadow rounded border py-2 px-4 my-3" onChange={handleDivisionChange} value={selectedDivision} required>
                <option value="">Select Division</option>
                {divisions.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
              </select>

              <select name="district" id="district" className="w-full shadow rounded border py-2 px-4 my-3" onChange={handleDistrictChange} value={selectedDistrict} required>
                <option value="">Select District</option>
                {districtOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>

              <select name="city" id="city" className="w-full shadow rounded border py-2 px-4 my-3" required>
                <option value="">Select City</option>
                {cityOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <button type="submit" className="my-4 px-4 py-2 rounded-md bg-primary text-white">Save</button>
            </form>
          )}
        </div>
        <div className="shadow rounded-md px-4 py-8 m-4 bg-white">
          <GoogleMapComponent onLocationSelect={handleLocationSelect} />
        </div>
        <div className="shadow rounded-md px-4 py-8 m-4 bg-white">
          {selectedCity && (
            <div>
              <h3 className="text-lg font-semibold">Donors in {selectedCity}</h3>
              {donors.length > 0 ? (
                <ul>
                  {donors.map(donor => (
                    <li key={donor.id}>{donor.fullName} - {donor.bloodGroup}</li>
                  ))}
                </ul>
              ) : (
                <p>No donors found in this city.</p>
              )}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
