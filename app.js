
import express from "express"
 import cors from "cors";
import { UserRouter } from "./src/modules/user/user.router.js";
import { taskRouter } from "./src/modules/task/task.router.js";
import { blogRouter } from "./src/modules/blogs/blog.router.js";
 

 const app = express()


app.use(cors())
app.use(express.json());

app.use('/api/users', UserRouter);
 app.use('/api/tasks', taskRouter );
 app.use('/api/blogs', blogRouter);

app.get('/', (req, res) => {
  res.send('Hello Task Manager!')
})

export default app