# REACT HOOKS
## useState là gì ? những lưu ý khi sử dụng useSate
* `useState`: Ra đời nhằm mục đích thể hiện trạng thái của dữ liệu ra giao diện người dùng, khi dữ liệu thay đổi giao diện người dùng cũng được thay đổi theo
* Những lưu ý khi sử dụng `useState`
    * Componet được re-render sau khi `setState` được gọi
    * Nếu có nhiều setState thì kiến trúc React sẽ xử lý và chỉ re-render 1 lần với nhiều setState nhưng vẫn xử lý đủ các setState
    * Initial state chỉ được sử dụng lần đầu tiên 
    * setState với callback
    * Initial state với callback - chú ý để tối ưu trang web
    * setState là thay thế state bằng một giá trị mới 
## useEffect là gì ? các trường hợp sử dụng của useEffect ? Các bài toán ứng dụng useEffect
* `useEffect`: Effect Hook cho phép thực hiện side effect bên trong các function component
    * Side effect: Thay đổi dữ liệu bên cạnh hoạt động chính 
* Các trường hợp của useEffect
    * 1. useEffect(callback)
        * Gọi callback mỗi khi component re-render
        * Gọi callback sau khi componenet được thêm vào DOM
    * 2. useEffect(callback, [])
        * Chỉ gọi callback một lần sau khi component được mount(Khi re-render nó không gọi lại)
        * Áp dụng khi muốn xử lý logic gì đó một lần 
    * 3. useEffect(callback, [deps])
        * Callback sẽ được gọi lại môi khi deps thay đổi
* Sự giống nhau
    * 1. Callback luôn được gọi khi component được mount
    * 2. Cleanup function luon duoc goi truoc khi component unmount
    * 3. Cleaup functuon luon duoc goi truoc khi callback duoc goi(tru lan dau tien)

* Các bài toán ứng dụng useEffect
    * Update DOM
        - Thay đổi title
    * Callapi
    * Listen DOM event
        - Scroll
        - Resize                                
    * Cleanup
        - Remove listener / Unsubscribe
        - Clear timer        
    * Avatar
    * Chat app

* memo hoc/
    * Ngăn chặn việc component render lại không cần thiết
    * Nêu không có memo mặc định component con nằm trong component cha mà component cha bị render thì component con auto bị render
    * Xác nhận việc render hay không dựa trên props của component con có thay đổi hay không, nếu props thay đổi thì dù có memo thì component con vẫn bị render lại để cập nhật giao diện
* useCallback
    * Tạo ra để thay đổi tham chiếu của một hàm thành một tham chiếu thống nhất đối với trường hợp[] 
    * Khi tham chiếu thống nhất thì component sẽ không bị render vì giá trị props nó kh thay đổi
    * Trường hợp có [deps] mà deps thay đổi thì component con sẽ bị render 

* css module
    * tag name, * -> an toan bo
    * Khong co tinh ke thua 
    * dat ten theo camelsecase


    # <img src="#" width="60" height="60" >REACTJS <br>

## ReactJs là gì ?
* Được phát triển bởi đội ngũ kỹ sư của Facebook 
* Là một thư viện được viết bằng Javascript
* Sử dụng để xây dựng giao diện người dùng

## Tại sao nên học ReactJs ?
* Độ hot của ReactJs rất cao
* Có cộng đồng lớn
* Xây dựng giao diện người dùng trở nên nhanh chóng đơn giản hơn
* Hiệu suất cao
* Tương lai phát triển tốt với ReactJs vì có nhiều nhà tuyển dụng tuyển vị trí lập trình viên ReactJS

## SPA(Single-Page application) là gì ? 
* Là một phương pháp tiếp cận phát triển web hiện đại 
* Tạo ra những ứng dụng web nâng cao trải nghiệm người dùng
* Không yêu cầu tải lại trang trong quá trình sử dụng
* Những công ty lớn sử dụng SPA để phát triển web: F8, Shoppe, 30Shine, ZingMP3,...

## MPA(Multi-Page application) là gì ?
* Là một phương pháp tiếp cận phát triển web theo hướng cổ điển
* Sẽ tải lại trang khi người dùng truy cập và chuyển hướng 

## SEO(Search Engine Optimization) là gì ?
* SEO là tối ưu hóa công cụ tìm kiếm
* Hiện nay Google cũng như các trình duyệt khác tập trung về mặt trải nghiệm người dùng là họ sẽ sử dụng các thuật toán để ưu tiên hiển thị các website nào mang lại trải nghiệm cho người dùng tốt hơn sẽ có độ hiển thị ưu tiên hơn các website khác
* Đối với SPA thì không thân thiện với SEO bởi vì khi thuật toán google mở src code lên thì chỉ nhận được một thẻ div root duy nhất nên sẽ khó phân tích hơn MPA 
* Nhưng hiện nay đã rất phát triển các ứng dụng được xây dựng bằng SPA cũng không cần quá lo lắng về vấn đề SEO cho trang web

## CSR(Client Side Rendering) và SSR(Server Side Redering) là gì ?
* SCR -> Tất cả giao diện được render ra từ phía client - SPA
* SSR -> Rất cả giao diện được render ra từ phía server - MPA

## Tại sao ReactJs hoặc Vuejs được gọi là Single-pape Application ?
* Bởi vì trong toàn bộ src code của dự án chỉ có đúng 1 file index.html
* Tất cả giao diện sẽ được render từ file index.html đó

## Chọn SPA hay MPA để phát triển ứng dụng web hiện nay ?
* Không có gì hoàn hảo trong mọi trường hợp cả
* Nên áp dụng theo yêu cầu khách hàng để thuận tiện sử dụng nhằm ít tốn công sức và thời gian hơn

## JSX là gì ? Babel là gì ?
### JSX 
* JSX là Javascript + XML(eXtensible Markup Language) là một cú pháp mở rộng cho JavaScript cho phép lập trình viên phát triển UI(User Interface - Giao diện người dùng) một cách dễ dàng và nhanh chóng
* JSX ra đời nhằm mục đích để viết được XML trong file JavasScript
* Cần phân biệt giữa HTML và XML 
    * HTML: Là `ngôn ngữ đánh dấu siêu văn bản`. Các thẻ(tag) trong HTML đã được xác định trước và không được tự định nghĩa. Các thẻ của HTML có những thẻ không cần thẻ đóng
    * XML: Là `ngôn ngữ đánh dầu mở rộng` dùng được sử dụng để mô tả dữ liệu được ứng dụng trong các API Service. Các thẻ (tag) trong XML chưa xác định trước, người dùng tự định nghĩa trong quá trình tạo tài liệu XML. Các thẻ của XML phải có thẻ đóng
    * Ngôn ngữ HTML và XML được thiết kế để phục vụ hai mục đích hoàn toàn khác nhau. Với HTML đó là để hiển thị dữ liệu và với XML đó là để lưu trữ dữ liệu. 
* Nếu sử dụng ReactJs để xây dựng giao diện người dùng thật là bỏ sót khi không sử dụng JSX vào dự án. JSX là không bắt buộc chúng ta có thể viết code JavaScript thuần nhưng mất thời gian hơn rất nhiều

### Babel 
* `Babel` được tạo ra để dịch các mã JavaScript từ các `phiên bản mới(ECMAScript - ES)` sang các `phiên bản cũ` hơn. Cần phải dịch bởi vì những trình duyệt cũ hoặc những trình duyệt không hỗ trợ phiên bản mới nên nó sẽ không hiểu những mã lệnh ấy
* Đối với `ReactJs` khi chúng ta sử dụng `JSX` để xây dựng giao diện người dùng thì trình duyệt tất nhiên sẽ không hiểu được các mã `JSX` nên `Babel` sẽ dịch các mã `JSX` sang `React.createElement` và truyền vào `ReactDOM` để render ra giao diện cho người dùng và trình duyệt có thể hiểu được

## Tại sao lại phải sử dụng props key khi render
* Là một logic để tối ưu hiệu năng render danh sách của `ReactJS`

## React.createElement trong ReactJs là gì ?
* Được sử dụng để tạo các element nói dễ hiểu hơn là các thẻ tag trong HTML
* Cú pháp var = React.createElement(`[type]`, `[props]`, `children`, `children_n`);
    * `type` là tên của thẻ HTML: `h1`, `p`, `img`
        * tuy nhiên `type` có thể là một `function` hoặc một số kiểu dữ liệu khác
    * `props` là các thuộc tính của thẻ `HTML`: `src`, `title`, `href`
        * `props` phải tuân theo qui ước có sẵn
        * Có 2 `props` đặc biệt là `className` và `forHTML` 
            * `className` chính là thuộc tính class trong HTML vì nó trùng với từ khóa `class` của ES6 nên được đổi thành `className` khi sử dụng với `React.createElement`
            * `forHTML` thì được React qui ước nên phải sử dụng `forHTML` thay vì `for`
    * `children` là các con của thẻ type hoặc là một đoạn text
        * `children` cũng được xem là `props`
    * Cách tạo một phần tử với `React.creatElement`
    ```
        VD1:
        var h1Node = React.createElement(
            'h1', 
            {
                className: 'fullName',
                title: 'me'
            },
            'Nguyen Huu Nhan'
        );
        <!-- Đoạn code trên sẽ tạo ra một element như thế này: `<h1 class="fullName" title="me">Nguyen Huu Nhan<h1/>` -->
        <!-- 
            type: h1
            props: {className, title}
            children: 'Nguyen Huu Nhan'
         -->
         
        VD2: 
        var ulNode = React.createElement(
            'ul', 
            {
                className: 'province-list',
            },
            React.createElement(
                'li',
                {
                    className: 'province-item',
                },
                'An Giang'
            ),
            React.createElement(
                'li',
                {
                    className: 'province-item',
                },
                'Binh Duong'
            )
        )
        <!-- 
            Đoạn code trên sẽ tạo ra một element như thế này 
            `<ul class="province-list">
                <li class="province-item">An Giang</li>
                <li class="province-item">Binh Duong</li>
            </ul>` 
        -->
         <!-- 
            type: ul, 
            props: {className: 'province-list', children: array(2)}
            children: array(2): là 2 thẻ li
         -->
    ```
    * Tuy nhiên nếu biết cách sử dụng `JSX` trong `ReactJs` thì việc tạo ra một element là cực kì đơn giản

## Component trong ReactJs là gì ? Các loại component trong ReactJs là gì ? Props trong React Component là gì ?
### Component
* Component là thành phần cốt lõi trong ReactJs. Mọi ứng dụng được phát triển từ ReactJs đều được cấu thành từ những component
* Các component này làm việc xây dựng UI trở nên đơn giản hơn rất nhiều. Đó là sự bóc tách một giao diện lớn thành các giao diện nhỏ và các giao diện nhỏ ấy là các component
* Sự thuận tiện khi sử dụng component là có thể tái sử dụng 
### Các loại component trong ReactJs 
* Function component
    * Hiểu đơn giản đây chỉ là một function bình thường của JavaScript
    * Trả về một `React Element`
    * Tên component phải được viết hoa chữ cái đầu(PascalCase)
* Class component 
    * Hiểu đơn giản là một class của ES6 sử dụng các tính chất của lập trình hướng đối tượng(OOP)
    * Trả về một `React element`
* Hiện nay thì `function component` đang được sử dụng phổ biến hầu như là 100% vì nó có cách viết ngắn gọn đơn giản hơn `class component` rất nhiều. 
### Props trong React component
* Như đã biết Function component chỉ là một function bình thường và props của chúng thực chất chỉ là đối số của nó mà thôi
* Props có thể nhận bất cứ kiểu dữ liệu gì 
```
    const FoodItem = () => {
        return (
            <h1 className="fullName">Nguyen Huu Nhan</h1>
        );
    }
    <!-- <div id="like_button_container"></div> -> idNode đây là tag duy nhất render ra UI theo SPA  -->
    ReactDOM.render(<NameItem/>, idNode);
    <!--
        - Nếu trong JavaScript để gọi được funtion thì phải là NameItem();
        - Còn trong JSX đã hỗ trợ cú pháp <NameItem></NameItem> 
        - Nếu bên trong NameItem không có children thì có thể viết thành <NameItem/>
        - Props là một object nên tất cả những gì ta truyền vào đều nằm trong object props
        - Ta thử truyền một props title="me" vào component 
        const NameItem = (props) => {
            return (
                <h1 className={props.title}>Nguyen Huu Nhan</h1>
            );
         }
        - Gọi component như sau
        <NameItem
            title="me"
        />
     -->

```

<!-- https://viblo.asia/p/tong-quan-ve-jsx-Qbq5QqBL5D8 -->