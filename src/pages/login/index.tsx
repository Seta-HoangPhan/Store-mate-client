import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import * as action from "@redux/features/auth/action";
import { formatPhoneNumber } from "@utils/formatPhone";
import { useState, type ChangeEvent } from "react";
import {
  Controller,
  useForm,
  type ControllerRenderProps,
} from "react-hook-form";
import { useDispatch } from "react-redux";
import "./index.scss";

interface FormValue {
  phone: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();

  const [showPwd, setShowPwd] = useState<boolean>(false);

  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const handleChangePhone = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<FormValue, "phone">
  ) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const firstNumber = rawValue[0];
    if (firstNumber && ![3, 5, 7, 8, 9].includes(Number(firstNumber))) {
      setError("phone", {
        message: "Số điện thoại bắt đầu với 3|5|7|8|9",
      });
      field.onChange("");
      return;
    }

    clearErrors("phone");
    field.onChange(formatPhoneNumber(rawValue.slice(0, 9), true));
  };

  const onSubmit = (data: FormValue) => {
    if (!data.phone) {
      setError("phone", {
        message: "Nhập số điện thoại",
      });
      return;
    }
    if (!data.password) {
      setError("password", {
        message: "Nhập mật khẩu",
      });
      return;
    }
    if (data.phone.length < 9) {
      setError("phone", {
        message: "Số điện thoại cần đủ 9 số (không bao gồm +84)",
      });
      return;
    }

    dispatch(action.login(data));
  };

  return (
    <div className="layout-wrapper">
      <div className="layout-sidebar">
        <div className="layout-sidebar__logo">
          <h1>Store Mate</h1>
        </div>
        <Divider className="layout-sidebar__divider" />
      </div>
      <div className="layout-container">
        <div className="layout-container__appbar"></div>
        <div className="layout-container__maincontent">
          <div className="login-main-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="login-wrapper">
                <h3>Đăng nhập</h3>
                <FormControl fullWidth className="login-form-control">
                  <FormLabel>Số điện thoại:</FormLabel>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className="login-form-control__input-adornment"
                                sx={{ lineHeight: "inherit" }}
                              >
                                +84
                              </InputAdornment>
                            ),
                          },
                        }}
                        onChange={(e) => handleChangePhone(e, field)}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </FormControl>
                <FormControl fullWidth className="login-form-control">
                  <FormLabel>Mật Khẩu:</FormLabel>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type={showPwd ? "text" : "password"}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <div
                                onClick={() => setShowPwd((prev) => !prev)}
                                className="login-form-control__show-pwd"
                              >
                                {showPwd ? <VisibilityOff /> : <Visibility />}
                              </div>
                            ),
                          },
                        }}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          clearErrors("password");
                        }}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                </FormControl>
                <Button variant="contained" type="submit">
                  Đăng nhập
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
