authApp.config(['$translateProvider',
  function ($translateProvider) {

    $translateProvider

    .translations('en', {
      APP_TITLE: 'AngularJS project for authentication users',
      WELCOM: 'Application for task #3 on Angular Training',
      SUCCESS_MESSAGE_LOGIN: 'Welcome, we redirect you to app within 3 seconds',
      ERROR_MESSAGE_LOGIN: 'Not correct login or password, or you not registered user',
      LOADING: 'LOADING...',
      LOGIN_PL: 'Login',
      PASSWORD_PL: 'Password',
      SIGN_IN: 'Sign in',
      FORGOT_PASSWORD_LINK: 'Forgot your password?',
      SUCCESS_MESSAGE_FORGOT: 'Dear user, your password is: ',
      ERROR_MESSAGE_FORGOT: 'Not correct login or password, or you not registered user',
      REMIND_PASSWORD: 'We can remind your password.',
      YOUR_LOGIN: 'Your login',
      REMIND: 'Remind',
      LOGIN_PAGE: 'Login page',
      DASHBOARD_VIEW: 'It is dashboard view',
      LOGOUT: 'LOGOUT',
      SHOW_INFO: 'Show info',
      EDIT_INFO: 'Edit info',
      LOGIN: 'Login:',
      NAME: 'Name:',
      AGE: 'Age:',
      BIRTHDATE: 'Birthdate:',
      FIELDS_REQUIRED: '*All fields are required',
      INVALID_NAME: 'Error: This is not a valid name. Current format: russian symbols, two words with separator ".", the first character must be uppercase.',
      INVALID_BIRTHDATE: 'Error: This is not a valid birthdate. Current format: DD MM YYYY',
      APPLY: 'Apply',
      ENTER_NAME: 'Enter your name',
      ENTER_AGE: 'Enter age',
      ENTER_BIRTHDATE: 'Enter your birthdate'
    })

    .translations('ru', {
      APP_TITLE: 'Приложение AngularJS для авторизации пользователей',
      WELCOM: 'Приложениe для задания №3 по ангулар тренингу',
      SUCCESS_MESSAGE_LOGIN: 'Добро пожаловать, мы перенаправим вас в приложение через 3 секунды',
      ERROR_MESSAGE_LOGIN: 'Неправильный логин или пароль, либо вы не зарегистрированы',
      LOADING: 'ЗАГРУЗКА...',
      LOGIN_PL: 'Логин',
      PASSWORD_PL: 'Пароль',
      SIGN_IN: 'Войти',
      FORGOT_PASSWORD_LINK: 'Забыли пароль?',
      SUCCESS_MESSAGE_FORGOT: 'Уважаемый пользователь, ваш пароль:',
      ERROR_MESSAGE_FORGOT: 'Неправильный логин или пароль, либо вы не зарегистрированы',
      REMIND_PASSWORD: 'Мы можем напомнить ваш пароль.',
      YOUR_LOGIN: 'Ваш логин',
      REMIND: 'Напомнить',
      LOGIN_PAGE: 'Войти',
      DASHBOARD_VIEW: 'Это страница с вкладками',
      LOGOUT: 'Выйти',
      SHOW_INFO: 'Информация',
      EDIT_INFO: 'Редактирование информации',
      LOGIN: 'Логин',
      NAME: 'Имя',
      AGE: 'Возраст',
      BIRTHDATE: 'Дата рождения',
      FIELDS_REQUIRED: '*Все поля обязательны для заполнения',
      INVALID_NAME: 'Error: Неправильное имя. Корректный формат: русские символы, два слова с разделителем ".", первые символы с большой буквы.',
      INVALID_BIRTHDATE: 'Error: Неверная дата. Корректный формат: DD MM YYYY',
      APPLY: 'Применить',
      ENTER_NAME: 'Введите ваше имя',
      ENTER_AGE: 'Введите возраст',
      ENTER_BIRTHDATE: 'Введите дату рождения'
    });
    
    $translateProvider.preferredLanguage('en');
  }
]);