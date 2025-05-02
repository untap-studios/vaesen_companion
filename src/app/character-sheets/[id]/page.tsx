"use client"
import React from 'react'

export default function Sheet({ params }: { params: Promise<{ id: string }> }) {
  const [sheetId, setSheetId] = React.useState<string | null>(null);
  const [sheet, setSheet] = React.useState<any>(null);
  // Unwrap the `params` Promise
  React.useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setSheetId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);
  // Fetch the character sheet data
  const getSheet = async () => {
    if (!sheetId) return; // Ensure `sheetId` is available before making the request
    try {
      const response = await fetch(`/api/character-sheets/${sheetId}`, {    
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const sheetData = await response.json();
        setSheet(sheetData);
        console.log("Sheet:", sheetData);
        // Handle the sheet data as needed
      } else {
        console.error("Failed to fetch sheet");
      }
    } catch (error) {
      console.error("Error fetching sheet:", error);
    }
  };
  React.useEffect(() => {
    if (sheetId) {
      getSheet();
    }
  }, [sheetId]);
  // Render the character sheet
  return (
    <div>
        <h1 className="text-2xl font-bold">Character Sheet</h1>
        <img src={sheet?.image} alt={sheet?.name} className="w-16 h-16 rounded-full" />
        <h2 className="text-xl font-bold">{sheet?.name}</h2>
        <p>Age: {sheet.age}</p>
        <p>Motivation: {sheet.motivation}</p>
        <p>Trauma: {sheet.trauma}</p>
        <p>Dark Secret: {sheet.darkSecret}</p>
        <p>Resources: {sheet.resources}</p>
        <p>XP: {sheet.experiencePoints}</p>
    </div>
  )
}
