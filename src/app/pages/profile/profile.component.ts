import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/get-users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: any[] = [];
  isAdminUser = false; // По умолчанию не админ

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => { 
        this.users = data;
        this.checkAdminRole(); // Проверяем роль пользователя при получении данных
      },
      (error) => {
        console.error('Ошибка получения пользователей:', error);
      }
    );
  }

  checkAdminRole(): void {
    // Здесь необходимо проверить, является ли текущий пользователь администратором
    // Например, с помощью данных аутентификации или других параметров

    // Пример проверки роли пользователя (ваша реализация может отличаться)
    // Пусть isAdminUser будет true, если роль пользователя - "admin"
    // Ваша реализация может быть основана на текущем пользователе или логике авторизации
    // Здесь просто приведен пример для наглядности
    const currentUser = this.users.find(user => user.role === 'admin');
    this.isAdminUser = !!currentUser;
  }

  isAdmin(): boolean {
    return this.isAdminUser;
  }
}