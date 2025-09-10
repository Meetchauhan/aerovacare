import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVideosAsync } from '../store/videoSlice';
import { videoApi } from '../services/videoApi';

export default function VideoSection() {
  const dispatch = useDispatch();
  const { videos, loading, error } = useSelector((state) => state.video);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);

  // Load videos on component mount
  useEffect(() => {
    dispatch(getVideosAsync({ page: 1, limit: 6, category: '' })); // Load first 6 videos
  }, [dispatch]);

  // Cleanup blob URL on component unmount
  useEffect(() => {
    return () => {
      if (videoBlobUrl) {
        URL.revokeObjectURL(videoBlobUrl);
      }
    };
  }, [videoBlobUrl]);

  const fetchVideoWithAuth = async (videoId) => {
    setVideoLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:5100/api/videos/stream/${videoId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideoBlobUrl(blobUrl);
    } catch (error) {
      console.error('Error fetching video:', error);
      setVideoBlobUrl(null);
    } finally {
      setVideoLoading(false);
    }
  };

  const handleVideoClick = (video) => {
    // Don't allow clicking on processing videos
    // if (video.status === 'processing') {
    //   return;
    // }
    
    setSelectedVideo(video);
    setShowModal(true);
    
    // Fetch video with authentication
    if (video._id || video.id) {
      fetchVideoWithAuth(video._id || video.id);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
    // Clean up blob URL to prevent memory leaks
    if (videoBlobUrl) {
      URL.revokeObjectURL(videoBlobUrl);
      setVideoBlobUrl(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section id="videos" className="py-20 bg-white px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Educational Videos</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Watch our collection of educational videos about tuberculosis awareness, prevention, and treatment. 
            Learn from our medical experts and stay informed about the latest developments in TB care.
          </p>
        </div>

        {loading && videos.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-red-800 mb-2">Unable to Load Videos</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Videos Available</h3>
            <p className="text-gray-600">Check back later for educational content about tuberculosis awareness and treatment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <div
                  key={video._id || video.id}
                  className={`bg-white rounded-xl shadow-lg transition-shadow duration-300 group `}
                  onClick={() => handleVideoClick(video)}
                >
                  {/* Video Thumbnail */}
                  <div className="relative overflow-hidden rounded-t-xl">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    {(video._id || video.id) && video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to icon if thumbnail fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`absolute inset-0 flex items-center justify-center ${(video._id || video.id) && video.thumbnailUrl ? 'hidden' : 'flex'}`}>
                      <div className="text-center">
                        <svg className="mx-auto h-16 w-16 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-blue-700 font-medium">Click to Play</p>
                      </div>
                    </div>
                  </div>
                    {/* Play Button Overlay */}
                    {/* {video.status !== 'processing' && (
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="bg-white bg-opacity-90 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <svg className="h-8 w-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )} */}
                    
                    {/* Processing Overlay */}
                    {/* {video.status === 'processing' && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="mx-auto h-12 w-12 text-white mb-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <p className="text-white text-sm font-medium">Processing...</p>
                        </div>
                      </div>
                    )} */}
                    {/* Status Badge */}
                    {/* <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        video.status === 'ready' || video.status === 'published' 
                          ? 'bg-green-100 text-green-800'
                          : video.status === 'processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {video.status === 'ready' || video.status === 'published' ? 'Ready' : 
                         video.status === 'processing' ? 'Processing' : 'Unknown'}
                      </span>
                    </div> */}
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {video.description}
                    </p>
                    
                    {/* Video Metadata */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{video.createdAt ? formatDate(video.createdAt) : 'Unknown date'}</span>
                      <span>{video.fileSize ? formatFileSize(video.fileSize) : 'Unknown size'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                View All Videos
              </button>
            </div>
          </>
        )}
      </div>

      {/* Video Modal */}
      {showModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">{selectedVideo.title}</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Video Player */}
              <div className="aspect-video bg-gray-100 rounded-lg mb-6 overflow-hidden">
                {selectedVideo && (selectedVideo._id || selectedVideo.id) ? (
                  videoLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <svg className="mx-auto h-16 w-16 text-blue-500 mb-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <p className="text-blue-600 font-medium">Loading Video...</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Please wait while we prepare the video for playback.
                        </p>
                      </div>
                    </div>
                  ) : videoBlobUrl ? (
                    <video
                      key={selectedVideo._id || selectedVideo.id}
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                      poster={selectedVideo.thumbnailUrl || undefined}
                      onError={(e) => {
                        console.error('Video playback error:', e);
                      }}
                    >
                      <source 
                        src={videoBlobUrl} 
                        type={selectedVideo.mimeType || "video/mp4"} 
                      />
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-gray-600 font-medium">Video not supported</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Your browser doesn't support video playback or the video format is not supported.
                          </p>
                          <a 
                            href={selectedVideo.downloadUrl || videoApi.getVideoStreamUrl(selectedVideo._id || selectedVideo.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                          >
                            Download Video
                          </a>
                        </div>
                      </div>
                    </video>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <svg className="mx-auto h-16 w-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-600 font-medium">Failed to Load Video</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Unable to load the video. Please try again or contact support.
                        </p>
                        <button 
                          onClick={() => fetchVideoWithAuth(selectedVideo._id || selectedVideo.id)}
                          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          Retry
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-600 font-medium">Video not available</p>
                      <p className="text-sm text-gray-500 mt-2">
                        This video is not available for playback.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700">{selectedVideo.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Upload Date:</span>
                    <p className="text-gray-600">{selectedVideo.createdAt ? formatDate(selectedVideo.createdAt) : 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">File Size:</span>
                    <p className="text-gray-600">{selectedVideo.fileSize ? formatFileSize(selectedVideo.fileSize) : 'Unknown'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
