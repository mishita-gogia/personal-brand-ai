import React, { useState } from "react";
import { ThumbsUp, MessageSquare, Repeat2, Send, Globe, MoreHorizontal, Check } from "lucide-react";

interface LinkedInMockupProps {
  userName: string;
  userHeadline: string;
  postContent: string;
  userAvatar?: string;
}

export default function LinkedInMockup({
  userName,
  userHeadline,
  postContent,
  userAvatar,
}: LinkedInMockupProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Set default placeholder if avatar not provided
  const avatarUrl =
    userAvatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200";

  // Quick helper to copy post draft
  const handleCopy = () => {
    navigator.clipboard.writeText(postContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe truncation of post copy to resemble real LinkedIn behavior
  const threshold = 280;
  const shouldTruncate = postContent.length > threshold && !isExpanded;
  const displayedContent = shouldTruncate
    ? postContent.slice(0, threshold) + "..."
    : postContent;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden transition-all duration-300 hover:border-slate-300">
      {/* Header bar of mockup */}
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider select-none font-mono">
          Interactive Live Feed Simulation
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Copied!</span>
            </>
          ) : (
            <span>Copy Post Copy</span>
          )}
        </button>
      </div>

      {/* Main LinkedIn card */}
      <div className="p-4 bg-white">
        {/* Author Metadata block */}
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <img
              src={avatarUrl}
              alt={userName}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover border border-slate-100 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[14.5px] text-slate-900 leading-tight hover:text-blue-600 hover:underline cursor-pointer">
                  {userName || "Your Name"}
                </span>
                <span className="text-xs text-slate-400 font-normal leading-tight">• 1st</span>
              </div>
              <p className="text-[12px] text-slate-500 font-normal line-clamp-2 mt-0.5 max-w-[400px]">
                {userHeadline || "Your LinkedIn Headline Suggestions will display here"}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                <span>1h</span>
                <span>•</span>
                <Globe size={11} className="text-slate-400" />
              </div>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Post content body */}
        <div className="mt-3.5 text-[14px] text-slate-800 font-normal leading-relaxed whitespace-pre-line break-words">
          {displayedContent}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-blue-600 hover:text-blue-700 hover:underline font-semibold ml-1.5 focus:outline-none"
            >
              ...see more
            </button>
          )}
          {isExpanded && postContent.length > threshold && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-500 hover:text-slate-600 hover:underline font-medium ml-1.5 text-xs block mt-1 focus:outline-none"
            >
              Show less
            </button>
          )}
        </div>

        {/* Mock feedback counters */}
        <div className="flex items-center justify-between border-b border-slate-100 py-2.5 mt-4 text-[12px] text-slate-500 select-none">
          <div className="flex items-center gap-1">
            <span className="flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full text-white">
              <ThumbsUp size={10} fill="currentColor" />
            </span>
            <span className="font-normal hover:text-blue-600 cursor-pointer">
              {isLiked ? 43 : 42} • 18 comments
            </span>
          </div>
          <div className="hover:text-blue-600 cursor-pointer hover:underline">
            3 reposts
          </div>
        </div>

        {/* Interactive action row */}
        <div className="flex items-center justify-between pt-1 mt-1 font-semibold text-[13px] text-slate-600 select-none">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center justify-center gap-2 flex-1 py-2 rounded-lg transition-colors hover:bg-slate-50 ${
              isLiked ? "text-blue-600" : "text-slate-600"
            }`}
          >
            <ThumbsUp size={15} fill={isLiked ? "currentColor" : "none"} />
            <span>Like</span>
          </button>
          <button className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg transition-colors hover:bg-slate-50">
            <MessageSquare size={15} />
            <span>Comment</span>
          </button>
          <button className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg transition-colors hover:bg-slate-50">
            <Repeat2 size={15} />
            <span>Repost</span>
          </button>
          <button className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg transition-colors hover:bg-slate-50">
            <Send size={15} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
