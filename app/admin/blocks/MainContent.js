
//component MainContent.js 

import BlogMeta from "./blogs/BlogMeta";

export default function MainContent({ selectedContent }) {
    return (
      <div className="py-5 px-8">

        {/* Content area to show information based on the selectedContent */}
        {selectedContent === 'Blog Meta' ? (
          <BlogMeta />
        ) : (
            <div>
              <h1>{selectedContent} Information</h1>
              {/* Rest content here */}
            </div>
          )}

        {/* Other conditionally rendered content based on selectedContent */}
      </div>
    );
  }
