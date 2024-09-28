import { MediaRenderer } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { SocialProfile } from "thirdweb/social";
import { client } from "../client";

interface ENSCardProps {
  profile: SocialProfile;
}

export function ENSCard({ profile }: ENSCardProps) {
  const ensMetadata = profile.metadata as { address?: string };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full mb-4">ENS</span>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden">
              {profile.avatar ? ( 
                <MediaRenderer
                  client={client}
                  src={profile.avatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
              )}
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{profile.name || 'Unnamed ENS'}</h2>
              <span className="inline-block px-2 py-1 text-xs text-gray-500 border border-gray-300 rounded-full">
                {shortenAddress(ensMetadata.address as string)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6">
            <a 
                href={`https://app.ens.domains/${profile.name}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-300 text-center"
            >
                View on ENS
            </a>
        </div>
      </div>
    </div>
  );
}