import { MediaRenderer } from "thirdweb/react";
import { SocialProfile } from "thirdweb/social";
import { client } from "../client";

interface LensCardProps {
  profile: SocialProfile;
}

export function LensCard({ profile }: LensCardProps) {
  const lensMetadata = profile.metadata as { handle?: string };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full mb-4">Lens</span>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden">
              {profile.avatar ? ( 
                <MediaRenderer
                  client={client}
                  src={profile.avatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500"></div>
              )}
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{profile.name || lensMetadata.handle || 'Unnamed Lens'}</h2>
              <p className="text-sm text-gray-600 line-clamp-3">{profile.bio}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex space-x-3">
          <a href={`https://hey.xyz/u/${profile.name || lensMetadata.handle}`} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-300 text-center">
            View on Hey
          </a>
          <a href={`https://orb.club/@${profile.name || lensMetadata.handle}`} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-300 text-center">
            View on Orb
          </a>
        </div>
      </div>
    </div>
  );
}