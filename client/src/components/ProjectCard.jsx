export default function ProjectCard({ name, status }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-600">{status}</p>
    </div>
  );
}
