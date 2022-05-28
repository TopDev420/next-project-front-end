import React from 'react';

type YoutubeEmbedProps = {
  src: string;
};

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ src }) => (
  <div className="youtube-embed">
    <iframe
      width="853"
      height="480"
      src={src}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;
