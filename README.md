# История создания приложения + его описание

Cоздаем задаем стартовую структуру нашему приложению и создади новые папки в src:
    store - для взаимодействия с mobx и хранения каких либо данных
    pages - тут будут находится корнивые компоненты которые будут являтся страницами
    components - для всяких нав-баров и в т.д.

Также сразу создадим некоторые страницы:
    в папке pages: Auth (страница с авторизацией), Shop (основная страница с карточками, постраничный вывод, список брендов и т.д.), DevicePage (страница конкретного устройства), Admin (здесь админ сможет добавлять типы, бренды и устройства), Basket (страница с корзиной (реализовывать не будем))

Теперь зная какие страницы будут в нашем приложении - мы можем реализовать навигацию по ним. Для этого в папке components создадим AppRouter. В нем будет описана логика навигации по страницам. Какие то страницы доступны всем, какие то - только авторизованным.

Далее в папке src создаем routes.js - где будут описаны все маршруты к конкретным страницам которые есть в нашем приложении. Чтобы не указывать маршруты в виде строки в routes.js - мы создадали папку utils, а в ней файл с константами - consts.js. И от сюда будем уже експортировать нужные нам константы в routes.js

После указания маршрутов в routes.js, мы будем исполользовать их в AppRouter, чтобы сделать их интерактивными.

Настраивая маршруты в AppRouter, стоит заметить что в новой версии "react-router-dom v6" больше не используется компонет "Switch", и его переименовали на "Routes". Со старым лексиконом ничего работать не будет. Также в новой версии убрали необходимость в указании команды "exact": In react router v6, the exact prop has been removed and you can put your routes in whatever order you wish and the router automatically detects the best route for the current URL. Дедали [по ссылке](https://bobbyhadz.com/blog/react-export-switch-imported-as-switch-not-found). Также в новой версии синтаксис Redirect заменили на Navigate.

После всех проделанных выше шагов теперь мы должны иметь возможность переходить по маршрутам страниц нашего магазина. И мы уже можем проверить это в тестовом режиме. Например перейдя по адресу "http://localhost:3000" - у нас будет отображаться страница "Shop", а перейдя по адресу "http://localhost:3000/login" - должна отображатся страница "Auth" и т.д.

Ниже будет описана логика перехода на страницы по указаным нами путями-ссылками, дополнительно с описанием того как это работает:
    1. В App.js мы задействуем елемент BrowserRouter (из 'react-router-dom') который дает нам возможность переключаться между разными компонентами в React. И в BrowserRouter мы ипортируем AppRouter;
    2. AppRouter в свою очередь является подобием логической развилки. Здесь мы можем задавать условия перехода на разные страницы, в зависимости от логики которую мы пропишем. В нашем случае, тут мы отделяем авторизованых пользователей от неавторизованных. Где "element={</>}", хранит в себе ссылку по которой мы можем переходить. P.S. Так как пункт №2 является продолжением логики пердыдущего пункта №1, получается после оборачивания нашего контента в BrowserRouter в прошлом пункте, далее мы дополнительно оборачиваем его в компонет Routes (из 'react-router-dom'). А в Routes дополниельно еще зоварачивааем Route. И в итоге, на данном этапе, у нас получается подобие матрешки из BrowserRouter > Routes > Route. Детальное описание работы такой мотрешки [тут](https://www.w3schools.com/react/react_router.asp);
    3. Пути страниц для AppRouter мы берем из routes.js. routes.js был создан для удобства. Здесь мы разделяем маршруты авторизованных пользоветелей от неавторизованных и помещаем их в разные объекты. Также в этих объектах мы указываем по какому пути-ссылке (path), какая страница-компанент должна отображаться (Component). И всю эту информацию мы експортируем в AppRouter для обработки. Также стоит заметить, что в routes.js, мы используем переменыые которые хранят в памяти пути-ссылки, вместо использоваеия путей напрямую. Все эти переменные хранятся в файле consts.js (папка utils), откуда мы их и экспортируем. Это было сделанно чисто ради удобства, ведь удобнее использовате переменную в разных частях кода, вместо прописывания полного пути;
    4. После всего вышеописанного, теперь мы можем переходить на интересующие нас страницы по указанным нами ссылкам.

Теперь, мы начнем имплементировать стейт менеджер (mobx), который будет следить за изменением состояния всех наших компонентов и контролировать их. И благодаря этому, мы, например, сможем использовать глобальное хранилище перменных, вместо временной заглушки "const isAuth = false" (из AppRouter). Для этого создадим глобальное хранилище "userStore" в папке "store" и начнем прописывать там логику работы стейт-менеджера.

После прописания логики, далее мы должны осуществить общение всех компонентов с нашим хранилищем. Для этого мы позвязываем наш класс из userStore к самому родительскому компоненту из index.js. Ведь именно он является началом всех дочерних компонентов. И именно из него мы сможем опрокидывать состояния из userStore в наши компоненты. И после подвязки его к index.js, мы будем иметь возможность обращаться за переменной или состоянием из любого компонента сперва к index.js, а он в свою очередь напрямую связан с глобальным хранилищем userStore. А это значит, что теперь у нас есть глобальное хранилище и из любого места нашего приложения мы можем получать из него данные.

Исходя из той же логике выше, также добавим и второе наше хранилище - DeviceStore. Здесь мы будем хранить информацию о наших брендах и типах товаров.

И в целом на этом карказ нашего приложения готов, поэтому далее мы можем приступать к верстке на Bootstrap.

Начнем мы с Navigation bar. Для этого в папке components создадим файл NavBar. После чего скопируем с сайта react-bootstrap нужный нам код на навбар, а также ссылки на все необходимые для его работы модули. После чего настроим его под наше усмотрение: лигику и стили.

После завершения работы с Navigation bar, мы перейдем к созданию формы авторизации и регестрации. Причем, под эту задачу у нас уже есть созданный ранее компонент Auth.js, где мы и будем создавать нашу форму. При чем сам компонент сделаем универсальным - он будет как под регестрацию так и под авторизацию.

Далее, займемся страницей магазина. Магазин находится у нас в Shop.js. Однако, логику вытягивания перечня типов товаров и их брендов из БД и дальнейший их вывод на фронтенд, мы пропишем в отдельных компонентах TypeBar.js, BrandBar.js и DeviceList.js. После чего, уже будем импортировать эти компоненты непосредственно в Shop.js. TypeBar.js и BrandBar.js выполняют функции фильтров товара, а DeviceList.js ответственный за отображание сетки/списка с товарами на главной странице нашего магазина.

Теперь можно приступить к реализации DevicePage. Это страница, которая при выборее товара из перечня всех товаров в магазине, будет отображать детали о нем, с возможностью добавления этого товара в корзину.

Далее реализуем админ панель. Сперва, чтобы на нее переходить, сделаем так, чтобы при нажатии на кнопку "Админ панель" в навбаре, нас пебрасывало на компонент Admin.js (при условии если роль нашего юзера это админ). Причем нужно не забывать, что в тестовом режиме, "Админ панель" в навбаре будет работать только когда мы укажем роль нашего юзера в userStore.js - как админ. И теперь можем переходит к реализации данного компонента.

Admin.js хранит в себе 3 основных кнопки/функционала: Добавить тип, Добавить бренд, Добавить устройство. При нажатии на каждую из этих кнопок, будет открываться окно для ввода данных. Информация из которых будет далее сохраняться в БД на сервере. И чтобы держать наш код чистым, то логику для отображения и работы модальных окон, мы вынесем как отдельные компоненты в папку components/modals. Описание работы каждого компонента, содержится в самом компоненте.

На этом мы завершаем визуальную верстку сайта и будем приступать к связыванию функционала нашего фронтенда с бекендом. Для этого создадим папку "http" и внутри нее файл "index.js", в котором, при помощи axios, будет реализировано два instance: $host и $authHost (для запросов, что требует авторизации). И далее, в папке http создадим файл userAPI.js, где мы, в свою очередь, реализуем отправку запросов на сервер, при помощи функций регистрации, авторизации и проверки токена на валидность. А данные (логин и пароль), что мы будем отправлять запросом, мы будем выцеплять из Auth.js, после того как пользователь ввел их. Для этого, в Auth.js, реализуем два состояния (для email & password) и функцию click(), которая будет уже передавать данные пользователя далее в Auth.js.

Теперь мы можем регестрировать пользователей и получать ответ от сервера, который будет содержать в себе JWT токен этого пользователя. И чтобы получать данные о пользователе из этого токена, воспользуеся npm пакетом - jwt-decode.

# Заметки

'rafce' - snippet

Перечень используемых npm пакетов:
    axios - для отправки запросов на сервер
    react router dom - для постраничной навигации
    mobx - стейт менеджер (по типу Redux)
    mobx lite - чтобы связать mobx с функциональными компонентами реакта
    bootstrap-react - Для работы с bootstrap заходим в в папку public, файл index.html, и вставляем в него код с официального сайта bootstrap
    jwt-decode - пакет который распарсивает (достает информацию) из JWT токенов, чтобы мы могли пользоваться информацией из токена

VS Code расширения:
    ES7+ React/Redux/React-Native snippets – командой “rfce” можно создавать класовый скелет компонентов в React

How to properly clean Create-React-App. -> Delete everything but index.js (initial starting point which later on calls App.js, where we will be implementing our code; don't forget to delete serviceWorker) and App.js (where we write our structure). These are backbone of our React-app so we're leaving them where yhey are. You can also leave indedx.css or App.js untouched. However they are not vital for React-app to work and we can create our own css files later on if we'd want to. Также удалим все лишнее из index.html. В index.html, в <body> будет храниться единственный div. И именно в него будет монтироваться наше приложение (наш корневой компонент App).

Using environment variables in a React application (Using a '.env' file)
When using create-react-app, the variable needs to start with REACT_APP_ otherwise this won’t work, and it’s mostly for security reasons. e.g. 'REACT_APP_MY_ENV=Some value'
