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