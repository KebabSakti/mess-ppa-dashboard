import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { LocalRoute } from "../../common/config/local_route";
import { BadRequest } from "../../common/error/bad_request";
import { StateEntity } from "../../domain/entity/state_entity";
import { AuthInteractor } from "../../domain/interactor/auth_interactor";
import { Button } from "../component/Button";
import { Toast } from "../component/Toast";

function LoginPage(props: { authInteractor: AuthInteractor }) {
  const navigate = useNavigate();

  const [authData, setAuthData] = useState<StateEntity<void>>({
    loading: false,
    data: null,
  });

  const [inputs, setInputs] = useState({ username: "", password: "" });

  async function login() {
    try {
      const scheme = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      });

      const { error } = scheme.validate(inputs);

      if (error != undefined) {
        throw new BadRequest("Username dan password tidak boleh kosong");
      }

      setAuthData({ loading: true });

      await props.authInteractor.login(inputs);

      navigate(LocalRoute.home, { replace: true });
    } catch (error: any) {
      setAuthData({
        loading: false,
        error: error.message,
      });
    }
  }

  function fieldOnChange(event: any) {
    const field = { ...inputs, [event.target.name]: event.target.value };
    setInputs(field);
  }

  return (
    <>
      <Toast show={authData.error != null} message={authData.error!} />
      <div
        className="flex flex-col h-screen justify-center 
items-center space-y-6"
      >
        <img src={logo} alt="logo" className="w-40" />
        <p className="text-2xl text-primary font-bold">DASHBOARD LOGIN</p>
        <div className="card w-96 shadow-xl">
          <div className="card-body items-center text-center space-y-2">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input input-bordered w-full max-w-xs"
              onChange={fieldOnChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered w-full max-w-xs"
              onChange={fieldOnChange}
            />
            <Button text="LOGIN" loading={false} onClick={() => login()} />
          </div>
        </div>
      </div>
    </>
  );
}

export { LoginPage };
