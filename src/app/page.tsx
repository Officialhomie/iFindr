'use client'

import { ConnectButton, SocialProfile } from "thirdweb/react";
import { client } from "./client";
import { useEffect, useState } from "react";
import { getSocialProfiles } from "thirdweb/social";
import { shortenAddress } from "thirdweb/utils";
import { CardSkeleton } from "./components/CardSkeleton";
import { ENSCard } from "./components/ENSCard";
import { FarcasterCard } from "./components/FarcasterCard";
import { LensCard } from "./components/LensCard";

type FilterType = "all" | "ens" | "farcaster" | "lens";

const isValidEthereumAddress = (address: string) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};


export default function Home() {

  const [searchInput, setSearchInput] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [userProfiles, setUserProfiles] = useState<SocialProfile[]>([]);
  const [activeFilter, setActivefilter] = useState<FilterType>("all");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);
  // const [filteredProfiles, setFilteredProfiles] = useState<SocialProfile[]>([]);

  useEffect(() => {
    setIsValidAddress(isValidEthereumAddress(searchInput))
  }, [searchInput])

  const handleSearch = async () => {
    if (!isValidAddress) return;

    setIsLoading(true);
    setSearchAddress(searchInput);
    try {
      const profiles = await getSocialProfiles({
        client: client,
        address: searchInput
      })
      setUserProfiles(profiles);
      // console.log(profiles)
      setHasSearched(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setSearchInput('');
    }
  }

  const filteredProfiles = userProfiles.filter(profile => 
    activeFilter === "all" || profile.type === activeFilter
  );

  return (
    <main className="min-h-screen bg-base-200 flex flex-col items-center p-4">
      {/* <div>
        <ConnectButton client={client}/>
      </div> */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-8 text-primary">
          iFindr
        </h1>

        <div className="flex flex-row items-center justify-center mb-4">
          <input 
          type="text" 
          placeholder="Enter Wallet Address" 
          value={searchInput} 
          onChange={(e) => setSearchInput(e.target.value)} 
          className={`bg-zinc-800 text-neutral-200 border border-zinc-700  rounded-md px-[10px] py-[5px] w-full max-w-xs mr-2 ${!isValidAddress && searchInput ? 'input-error' : ''}`}
          disabled={isLoading} />

          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
            onClick={ () => {
              handleSearch();
            }}
            disabled={isLoading || !isValidAddress}
          >
            {isLoading? "Searching" : "Search"}
          </button>
        </div>

        {searchInput && !isValidAddress && (
          <p className="text-red-500 text-sm text-left mt-1">Please Input a Valid Ethereum Address</p>
        )}


        {hasSearched && (
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-4">
              Search results for: <span className="font-medium">{shortenAddress(searchAddress)}</span>
            </p>

            <div className="flex justify-center space-x-2 bg-gray-200 rounded-lg p-1">
              {["all", "ens", "farcaster", "lens"].map((filter) => (
                <button
                  key={filter}

                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeFilter === filter
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-base-100"
                  }`}
                  onClick={() => setActivefilter(filter as FilterType)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
        {isLoading ? (
          Array(3).fill(0).map((_, index) => (
            <div key={index} className="w-full h-full animate-pulse">
              <CardSkeleton />
            </div>
          ))
        ) : hasSearched && filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile, index) => (
            <div key={index} className="w-full h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
              {profile.type === "ens" && <ENSCard profile={profile} />}
              {profile.type === "farcaster" && <FarcasterCard profile={profile} />}
              {profile.type === "lens" && <LensCard profile={profile} />}
            </div>
          ))
        ) : hasSearched ? (
          <p className="text-center text-gray-500 col-span-full text-lg font-medium py-8">No profiles found for this address.</p>
        ) : null} 
      </div>

    </main>
  );
}
