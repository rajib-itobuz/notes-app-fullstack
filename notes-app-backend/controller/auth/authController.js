import { User } from "../../models/user.js";
import bcrypt from "bcrypt";
import { config } from "../../config/index.js";
import jwt from "jsonwebtoken";


class authController {
    constructor() {
        this.emailValidator = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    }

    async registerUser(req, res, next) {
        try {
            let { email, password } = req.body;
            email = email.trim().toLowerCase();
            password = password.trim();

            if (email && password) {

                if (!String(email).match(this.emailValidator)) {
                    throw new Error("invalid email");
                }


                const hashedPassword = bcrypt.hashSync(password, Number(config.salt));
                const user = await User.create({ email, password: hashedPassword });

                if (user) {
                    const token = jwt.sign({ email, id: user._id }, config.secret, { expiresIn: '30d' });
                    return res.status(200).send({ status: 400, "message": "user created successfully", data: { token, email } });
                }

            } else {
                throw new Error("missing fields")
            }
        } catch (err) {

            next(err);
        }
    }


    async loginUser(req, res, next) {
        try {
            let { email, password } = req.body;
            email = email.trim().toLowerCase();
            password = password.trim();

            if (email && password) {
                if (!String(email).match(this.emailValidator)) {
                    throw new Error("invalid email");
                }


                const user = await User.findOne({ email });

                if (user && bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({ email, id: user._id }, config.secret, { expiresIn: '30d' });
                    return res.status(200).send({ status: 200, "message": "User logged in Successfully", data: { token, email, orders: user.orders, cart: user.cart, } })
                } else {
                    throw new Error("user not found/invalid credentials")

                }
            } else {
                throw new Error("missing fields")
            }

        } catch (err) {
            next(err);
        }


    }
}


export default new authController();