import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { getMedicineAlternatives } from "@/lib/api-client";
import Head from "next/head";

export default function AlternativeMedicines() {
  const router = useRouter();
  const [alternatives, setAlternatives] = useState(null);

  useEffect(() => {
    if (!router.query.generic) return;

    getMedicineAlternatives(router.query.generic as string)
      .then((data) => {
        setAlternatives(data.content);
      })
      .catch((err) => console.log(err));
  }, [router.query.generic]);

  const handleRowClick = (slug) => {
    router.push(`/medicines/${slug}`);
  };

  return (
    <>
      <Head>
        <title>Alternative Medicines - Cerena</title>
      </Head>
      <Layout>
        <div className="shadow rounded-md px-14 py-12 m-4 bg-white">
          <h1 className="text-3xl font-bold mb-4 text-[#435b66]">
            Alternative Brands
          </h1>
          <h2 className="relative pl-[20px] text-[#366970] mb-10">
            {router.query.generic
              ? (router.query.generic as string).replace(/-/g, " ")
              : ""}
            <span
              className="absolute left-0 top-0 bottom-0 w-[10px]"
              style={{ backgroundColor: "#366979" }}
            />
          </h2>

          {alternatives && alternatives.length > 0 ? (
            <table className="min-w-full bg-[#009688] border border-gray-300">
              <thead>
                <tr>
                  <th className="px-2 py-2 border-b text-white text-left">Brand Name</th>
                  <th className="px-2 py-2 border-b text-white text-left">Dosage Form</th>
                  <th className="px-2 py-2 border-b text-white text-left">Strength</th>
                  <th className="px-2 py-2 border-b text-white text-left">Company</th>
                  <th className="px-2 py-2 border-b text-white text-left">Pack Size & Price</th>
                </tr>
              </thead>
              <tbody>
                {alternatives.map((alt) => (
                  <tr
                    key={alt.id}
                    className="even:bg-[#cbf3ef] odd:bg-white odd:text-black even:text-black even:hover:text-black hover:bg-gray-200 text-white cursor-pointer"
                    onClick={() => handleRowClick(alt.slug)}
                  >
                    <td className="px-2 py-2 border-b">
                      {alt.brandName}
                    </td>
                    <td className="px-2 py-2 border-b">
                      {alt.dosageForm}
                    </td>
                    <td className="px-2 py-2 border-b">
                      {alt.strength}
                    </td>
                    <td className="px-2 py-2 border-b">
                      {alt.manufacturer}
                    </td>
                    <td className="px-2 py-2 border-b">
                      {alt.packSize}{alt.price.replace(/,/g, ' ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No alternative medicines found.</p>
          )}
        </div>
      </Layout>
    </>
  );
}
