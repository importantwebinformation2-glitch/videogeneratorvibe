function App() {
  const [activeTab, setActiveTab] = React.useState('text');
  const [videoUrl, setVideoUrl] = React.useState(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [textInput, setTextInput] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [generatedType, setGeneratedType] = React.useState('');

  // Different videos for each type
  const videoSamples = {
    text: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    audio: "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4",
    video: "https://test-videos.co.uk/vids/elephantsdream/mp4/h264/360/Elephants_Dream_360_10s_1MB.mp4"
  };

  const generateVideo = (type) => {
    setIsGenerating(true);
    setProgress(0);
    setGeneratedType(type);

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setVideoUrl(videoSamples[type]);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleTextGenerate = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      generateVideo('text');
    }
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      generateVideo(type);
    }
  };

  const downloadVideo = () => {
    if (!videoUrl) return;
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `generated-${generatedType}-video.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    if (!videoUrl) return;
    navigator.clipboard.writeText(videoUrl).then(() => {
      alert('Video link copied to clipboard!');
    });
  };

  // Social media share functions
  const shareToTwitter = () => {
    const text = encodeURIComponent(`Check out this AI-generated video: ${videoUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(videoUrl)}&title=AI%20Generated%20Video`, '_blank');
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this AI video: ${videoUrl}`)}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('AI Generated Video');
    const body = encodeURIComponent(`Check out this video I generated: ${videoUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#1e40af', marginBottom: '30px', fontSize: '28px' }}>
          🎬 AI Video Generator
        </h1>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '25px',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '10px'
        }}>
          <button
            onClick={() => setActiveTab('text')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'text' ? '#1e40af' : '#e2e8f0',
              color: activeTab === 'text' ? 'white' : '#1e40af',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Text to Video
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'audio' ? '#1e40af' : '#e2e8f0',
              color: activeTab === 'audio' ? 'white' : '#1e40af',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Audio to Video
          </button>
          <button
            onClick={() => setActiveTab('video')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'video' ? '#1e40af' : '#e2e8f0',
              color: activeTab === 'video' ? 'white' : '#1e40af',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Video to Video
          </button>
        </div>

        {/* Input Sections */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          {activeTab === 'text' && (
            <form onSubmit={handleTextGenerate}>
              <h3 style={{ margin: '0 0 15px 0', color: '#1e40af' }}>Describe your video scene:</h3>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
                placeholder="Example: 'A sunset over mountains with a river, cinematic lighting, 10 seconds duration'"
                disabled={isGenerating}
              />
              <button
                type="submit"
                disabled={isGenerating || !textInput.trim()}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: isGenerating ? '#9ca3af' : '#1e40af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: isGenerating ? 'not-allowed' : 'pointer'
                }}
              >
                {isGenerating ? '⏳ Generating...' : '✨ Generate Video'}
              </button>
            </form>
          )}

          {activeTab === 'audio' && (
            <div>
              <h3 style={{ margin: '0 0 15px 0', color: '#1e40af' }}>Upload audio file:</h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '15px' }}>MP3, WAV, AAC (Max 50MB)</p>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileUpload(e, 'audio')}
                disabled={isGenerating}
                style={{ display: 'none' }}
                id="audio-upload"
              />
              <label
                htmlFor="audio-upload"
                style={{
                  display: 'block',
                  padding: '40px',
                  border: '2px dashed #cbd5e1',
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: '#f8fafc',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.borderColor = '#1e40af'}
                onMouseLeave={(e) => e.target.style.borderColor = '#cbd5e1'}
              >
                {fileName ? (
                  <span style={{ color: '#1e40af', fontWeight: '500' }}>🎵 {fileName}</span>
                ) : (
                  <>
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎤</div>
                    <span style={{ fontWeight: '500', color: '#64748b' }}>Click to upload or drag & drop</span>
                  </>
                )}
              </label>
            </div>
          )}

          {activeTab === 'video' && (
            <div>
              <h3 style={{ margin: '0 0 15px 0', color: '#1e40af' }}>Upload video file:</h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '15px' }}>MP4, MOV, AVI (Max 200MB)</p>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload(e, 'video')}
                disabled={isGenerating}
                style={{ display: 'none' }}
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                style={{
                  display: 'block',
                  padding: '40px',
                  border: '2px dashed #cbd5e1',
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: '#f8fafc',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.borderColor = '#1e40af'}
                onMouseLeave={(e) => e.target.style.borderColor = '#cbd5e1'}
              >
                {fileName ? (
                  <span style={{ color: '#1e40af', fontWeight: '500' }}>🎥 {fileName}</span>
                ) : (
                  <>
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>📹</div>
                    <span style={{ fontWeight: '500', color: '#64748b' }}>Click to upload or drag & drop</span>
                  </>
                )}
              </label>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {isGenerating && (
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#1e40af' }}>🎥 Generating Your Video</h3>
            <div style={{
              width: '100%',
              background: '#e2e8f0',
              borderRadius: '9999px',
              height: '10px',
              marginBottom: '15px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #1e40af, #3b82f6)',
                height: '100%',
                borderRadius: '9999px',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
              {progress}% complete - Creating {generatedType} video...
            </p>
          </div>
        )}

        {/* Video Preview */}
        {videoUrl && !isGenerating && (
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ margin: '0 0 20px 0', color: '#1e40af' }}>✅ Your Generated Video</h2>

            <div style={{
              background: '#000',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '20px',
              position: 'relative'
            }}>
              <video
                src={videoUrl}
                controls
                style={{ width: '100%', height: 'auto' }}
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='100%25' height='100%25' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' fill='white' text-anchor='middle' dy='.3em' font-size='24' font-family='Arial'%3EAI Generated Video%3C/text%3E%3C/svg%3E"
              />
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                {generatedType.toUpperCase()} VIDEO
              </div>
            </div>

            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '14px' }}>
              {generatedType === 'text' && "Generated from your text description"}
              {generatedType === 'audio' && "Generated from your audio file"}
              {generatedType === 'video' && "Enhanced from your uploaded video"}
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => generateVideo(activeTab)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#e2e8f0',
                  color: '#1e40af',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#cbd5e1'}
                onMouseLeave={(e) => e.target.style.background = '#e2e8f0'}
              >
                🔄 Generate Again
              </button>

              <button
                onClick={downloadVideo}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#059669'}
                onMouseLeave={(e) => e.target.style.background = '#10b981'}
              >
                📥 Download
              </button>

              <button
                onClick={() => setShowShareModal(true)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#2563eb'}
                onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
              >
                📤 Share
              </button>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowShareModal(false)}
          >
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 20px 25px rgba(0,0,0,0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{
                margin: '0 0 20px 0',
                textAlign: 'center',
                color: '#1e40af',
                fontSize: '24px'
              }}>
                Share Your Video
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <button
                  onClick={shareToTwitter}
                  style={{
                    padding: '15px',
                    background: '#1DA1F2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>🐦</span> Twitter
                </button>

                <button
                  onClick={shareToFacebook}
                  style={{
                    padding: '15px',
                    background: '#1877F2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>📘</span> Facebook
                </button>

                <button
                  onClick={shareToLinkedIn}
                  style={{
                    padding: '15px',
                    background: '#0A66C2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>💼</span> LinkedIn
                </button>

                <button
                  onClick={shareToWhatsApp}
                  style={{
                    padding: '15px',
                    background: '#25D366',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>📱</span> WhatsApp
                </button>

                <button
                  onClick={shareViaEmail}
                  style={{
                    padding: '15px',
                    background: '#EA4335',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    gridColumn: '1 / -1'
                  }}
                >
                  <span>✉️</span> Email
                </button>
              </div>

              <div style={{
                borderTop: '1px solid #e2e8f0',
                paddingTop: '20px',
                display: 'flex',
                gap: '10px'
              }}>
                <button
                  onClick={copyToClipboard}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#f1f5f9',
                    color: '#1e40af',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>🔗</span> Copy Link
                </button>

                <button
                  onClick={() => setShowShareModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Initialize React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
