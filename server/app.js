require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
app.use(express.json());


// BDD Mango
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log("Connecté à MongoDB.");
    })
    .catch(err => console.error("Erreur de connexion à MangoDB.", err));

const authRoutes = require("./routes/authRoutes");

app.use("/users", userRoutes);
    app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes);


// Pour Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Phone Directory API',
            version: '1.0.0',
            description: 'API pour la gestion d\'un annuaire téléphonique avec authentification JWT',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Serveur de développement'
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});