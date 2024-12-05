import React from "react";
import iconMap from "../utils/iconMap"; 

const SkillsSection = ({ skills }) => {
  const renderSkillIcons = (skillsList) => {
    return skillsList.map((skill, index) => {
      const IconPath = iconMap[skill]; 

      return (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-4 hover:scale-110 transition-transform duration-300"
          title={skill} 
        >
          <img
            src={IconPath} 
            alt={skill}
            className="w-12 h-12 mb-2" 
          />
          <span className="text-sm text-gray-900">{skill}</span>
        </div>
      );
    });
  };

  return (
    <section id="skills" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center text-black">
          Skills & Technologies
        </h2>

        {/* Languages Section */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4 text-center text-loreal-text-secondary">
            Languages
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {renderSkillIcons(skills.languages)}
          </div>
        </div>

        {/* Technologies Section */}
        <div>
          <h3 className="font-semibold mb-4 text-center text-loreal-text-secondary">
            Technologies
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {renderSkillIcons(skills.technologies)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;