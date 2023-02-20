import { AuthRepository } from "../port/repository/auth_repository";

class AuthInteractor {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async login(option?: { [key: string]: any } | undefined): Promise<void> {
    const results = await this.authRepository.login(option!);
    sessionStorage.setItem("auth", results);
  }

  logout() {
    sessionStorage.clear();
  }
}

export { AuthInteractor };
