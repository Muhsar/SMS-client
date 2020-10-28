export const OwnerServer = process.env.NODE_ENV==='production' ? 'https://schmanagerserver.herokuapp.com/api/owner' : 'http://localhost:5000/api/owner'
export const TeacherServer = process.env.NODE_ENV==='production' ? 'https://schmanagerserver.herokuapp.com/api/teacher' : 'http://localhost:5000/api/teacher'
export const ParentServer = process.env.NODE_ENV==='production' ? 'https://schmanagerserver.herokuapp.com/api/parent' : 'http://localhost:5000/api/parent'


