abstract class AuthRepository {
  abstract login(option?: { [key: string]: any }): Promise<string>;
}

export { AuthRepository };
