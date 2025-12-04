//? dependencias
import app from "./app.js";

//? configuracion del puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});
