import multer from "multer";
import path from "path";
import fs from "fs";

// Asegurar que el directorio existe
const uploadDir = path.join(process.cwd(), "public/uploads/profiles");
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		// Renombrar archivo para evitar colisiones y mantener extensión
		// Usaremos el ID del usuario si está disponible en req.user, o timestamp
        // @ts-ignore
		const userId = req.user?.id || "unknown";
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const ext = path.extname(file.originalname);
		cb(null, `avatar-${userId}-${uniqueSuffix}${ext}`);
	},
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
	// Aceptar solo imágenes
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Solo se permiten archivos de imagen"));
	}
};

export const uploadProfileImage = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB límite
	},
});
