// import React, {createContext, useEffect, useReducer} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Khai báo kiểu dữ liệu cho state và action
// interface AuthState {
//   user: any;
//   loading: boolean;
//   error: string | null;
// }

// interface AuthContextType extends AuthState {
//   dispatch: React.Dispatch<AuthAction>;
// }

// type AuthAction =
//   | {type: 'LOGIN_START'}
//   | {type: 'LOGIN_SUCCESS'; payload: any}
//   | {type: 'LOGIN_FAILURE'; payload: string}
//   | {type: 'REGISTER_SUCCESS'}
//   | {type: 'LOGOUT'};

// // Tạo context AuthContext với kiểu AuthContextType
// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: false,
//   error: null,
//   dispatch: () => {},
// });

// // Khởi tạo state ban đầu
// const initial_state: AuthState = {
//   user: null,
//   loading: true,
//   error: null,
// };

// // Reducer xử lý các action
// const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case 'LOGIN_START':
//       return {
//         user: null,
//         loading: true,
//         error: null,
//       };
//     case 'LOGIN_SUCCESS':
//       return {
//         user: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'LOGIN_FAILURE':
//       return {
//         user: null,
//         loading: false,
//         error: action.payload,
//       };
//     case 'REGISTER_SUCCESS':
//     case 'LOGOUT':
//       return {
//         user: null,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// // Component AuthContextProvider
// export const AuthContextProvider = ({children}: {children: any}) => {
//   const [state, dispatch] = useReducer(AuthReducer, initial_state);

//   // Load initial state khi component được mount
//   useEffect(() => {
//     const loadInitialState = async () => {
//       try {
//         const userJson = await AsyncStorage.getItem('user');
//         const user = userJson ? JSON.parse(userJson) : null;

//         dispatch({type: 'LOGIN_SUCCESS', payload: user});
//       } catch (error) {
//         console.error('Error loading initial state:', error);
//         dispatch({type: 'LOGIN_FAILURE', payload: error.message});
//       }
//     };

//     loadInitialState();
//   }, []);

//   // Lưu trạng thái người dùng vào AsyncStorage khi có thay đổi
//   useEffect(() => {
//     AsyncStorage.setItem('user', JSON.stringify(state.user));
//   }, [state.user]);

//   // Trả về AuthContext.Provider với giá trị state và dispatch
//   return (
//     <AuthContext.Provider value={{...state, dispatch}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
