import { useRouter } from "next/router";
export default function Index({ updateUI }) {
  const router = useRouter();

  console.log("process.env => ", process.env);
  console.log("process.env.EXP => ", process.env.EXP);
  console.log("process.env.NEXT_PUBLIC_EXP => ", process.env.NEXT_PUBLIC_EXP);

  return (
    <div>
      <a
        onClick={() => {
          router.push("/test");
        }}
      >
        test
      </a>
      <br />
      <img src="/assets/images/aaa.jpg" alt="aaa.jpg" />
    </div>
  );
}
