import React from 'react';
import { Alternative } from '@/types'; // Adjust the path as needed

// Define the props interface to accept alternatives
interface AlternativesTableProps {
  alternatives: Alternative[];
}

// AlternativesTable component
export function AlternativesTable({ alternatives }: AlternativesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Name</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Dosage Form</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Strength</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Company</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Price</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Link</th>
          </tr>
        </thead>
        <tbody>
          {alternatives.map(alternative => (
            <tr key={alternative.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 border-b border-gray-300">{alternative.name}</td>
              <td className="px-6 py-4 border-b border-gray-300">{alternative.dosageForm}</td>
              <td className="px-6 py-4 border-b border-gray-300">{alternative.strength}</td>
              <td className="px-6 py-4 border-b border-gray-300">{alternative.company}</td>
              <td className="px-6 py-4 border-b border-gray-300">{alternative.price}</td>
              <td className="px-6 py-4 border-b border-gray-300">
                <a href={alternative.href} className="text-blue-500 hover:underline">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
