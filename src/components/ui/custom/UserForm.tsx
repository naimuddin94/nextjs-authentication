"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { ColorRing } from "react-loader-spinner";

interface UserData {
  username: string;
  email: string;
  password: string;
}

function UserForm() {
  const { toast } = useToast();
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserData>();

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    const res = await axios.post("/api/users/register", data);
    console.log(res);
    if (res.status === 200) {
      toast({ title: res?.data?.message });
      reset();
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Register new user</CardTitle>
            <CardDescription>
              create new user with valid credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  {...register("username")}
                  id="username"
                  placeholder="Name of your project"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  placeholder="Name of your project"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  id="password"
                  placeholder="Name of your project"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="">
            <Button variant="secondary" type="submit">
              {isSubmitting ? (
                <ColorRing
                  visible={true}
                  height="35"
                  width="35"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              ) : (
                "Save"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}

export default UserForm;
