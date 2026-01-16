import app from "./app.js";
import env from "./config/env.js";

//? configuracion del puerto
const PORT = env.PORT;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});
