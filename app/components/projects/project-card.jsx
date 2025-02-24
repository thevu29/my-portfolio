import { colors } from "@/data/colors";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { IoLinkSharp } from "react-icons/io5";

function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <Link href={project.url} target="_blank">
      <div className="p-8 h-48 flex flex-col justify-between bg-primary-bg">
        <div className="">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold capitalize text-primary-title">
              {project.name}
            </p>
            <IoLinkSharp className="text-primary-icon text-xl" />
          </div>
          <p className="line-clamp-2 text-primary-text my-5 text-sm">
            {project.description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <p className="flex items-center gap-2">
              <FaRegStar className="text-primary-icon" />
              <span>{project.stargazerCount}</span>
            </p>
            <p className="flex items-center gap-2">
              <FaCodeFork className="text-primary-icon" />
              <span>{project.forkCount || 0}</span>
            </p>
          </div>
          {project.primaryLanguage && (
            <p className="flex items-center gap-2">
              <span
                style={{ backgroundColor: project.primaryLanguage.color }}
                className="w-3 h-3 rounded-full"
              ></span>
              <span className="text-primary-text text-sm">
                {project.primaryLanguage.name}
              </span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
