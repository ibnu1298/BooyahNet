import React from "react";

interface Package {
  id: number;
  packageName: string;
  pricePackage: number;
  maxUser: number;
  maxBandwidth: number;
}
interface responsePackages {
  packages: Array<Package>;
  message: string;
  isSucceeded: boolean;
}
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpYm51YXFpbDEyOThAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJleHAiOjE3MDE0NDA3MzF9.t3BJwty76Xcoi-8GE49hYEP1hkcRgEjSZZBSfu5Ehic";
const url = "https://booyahnetapi.azurewebsites.net/api/Package";
async function getPackage() {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
    next: {
      tags: ["paket"], //revalidate manual menggunakan api local
      revalidate: 60, //revalidate setiap 60 detik
      //jadi bisa tunggu 1 menit atau hit api revalidate dengan tag=paket
    },
  });
  if (!res.ok) {
    throw new Error("Gagal Fecthing Data");
  }

  return res.json();
}

export default async function PackagePage() {
  const data = await getPackage();
  return (
    <div className="grid grid-cols-4">
      {data.packages.length > 0 &&
        data.packages.map((myPackage: Package) => (
          <div key={myPackage.id}>
            <div>Package Page</div>
            <div>Nama Paket :{myPackage.packageName}</div>
            <div>Harga Paket : {myPackage.pricePackage}</div>
            <div>Max User : {myPackage.maxUser} Orang</div>
            <div>Max Banwitdh : {myPackage.maxBandwidth}</div>
            <br />
          </div>
        ))}
    </div>
  );
}
