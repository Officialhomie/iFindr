import { MediaRenderer } from "thirdweb/react";
import { SocialProfile } from "thirdweb/social";
import { client } from "../client";
import Link from "next/link";

interface FarcasterCardProps {
  profile: SocialProfile;
}

export function FarcasterCard({ profile }: FarcasterCardProps) {
  const farcasterMetadata = profile.metadata as { fid?: string; display_name?: string };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-purple-500 rounded-full mb-4">Farcaster</span>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden">
              {profile.avatar ? ( 
                <MediaRenderer
                  client={client}
                  src={profile.avatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500"></div>
              )}
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{profile.name || 'Unnamed Farcaster'}</h2>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs text-gray-500 border border-gray-300 rounded-full px-2 py-1">{farcasterMetadata.fid}</span>
                <p className="text-sm text-gray-600">{farcasterMetadata.display_name}</p>
              </div>
              {profile.bio && <p className="text-sm text-gray-600 line-clamp-3">{profile.bio}</p>}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link 
            href={`https://warpcast.com/${profile.name}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block w-full px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600 transition-colors duration-300 text-center"
          >
            View on Warpcast
          </Link>
        </div>
      </div>
    </div>
  );
}