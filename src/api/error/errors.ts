

type ErrorMessages = Record<string, string>

export const ErrorMessages: ErrorMessages = {
    "invalid credentials": "Неверный логин или пароль",
    "user already exist": "Пользователь с таким логином уже существует",
    "invalid phone number": "Невалидный номер телефона",
    "patronymic is empty": "Отчество не может быть пустым",
    "surname is empty": "Фамилия не может быть пустой",
    "name is empty": "Имя не может быть пустым",
}