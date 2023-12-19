const ContentSection = ({ title, content, imageUrl }: ContentSectionProps) => {
  return (
    <div className="bg-white text-gray-800 p-6 md:p-10 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          {imageUrl && (
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 lg:mr-8">
              <img
                src={imageUrl}
                alt={title}
                className="w-full md:w-48 lg:w-64 rounded-lg shadow-lg"
              />
            </div>
          )}
          <div className="flex-grow">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
            <p className="text-base md:text-lg">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
