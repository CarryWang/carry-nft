import Image from "next/image";
import Link from "next/link";

const hotNFTs = [
  {
    name: "Slerf NFT",
    image: "/images/hotnft1.png",
  },
  {
    name: "Phaver-UP NFT",
    image: "/images/hotnft2.png",
  },
  {
    name: "Rune Store",
    image: "/images/hotnft3.png",
  },
  {
    name: "Rune Store2",
    image: "/images/hotnft4.png",
  },
];
export default function Home() {
  const isConnected = false;

  const handleAction = (e: any) => {
    if (isConnected) {
      return;
    }
    e.preventDefault();
  };

  return (
    <>
      <div>
        <div className="hero min-h-[360px]">
          <div className="hero-content text-center">
            <div className="max-w-5xl">
              <div className="text-5xl font-bold flex gap-4">
                <span>You can</span>

                <Link
                  href="/me/borrow"
                  onClick={handleAction}
                  className="uppercase underline decoration-4 text-sky-300 decoration-sky-500 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                >
                  Borrow
                </Link>

                <span className=" text-white">or</span>

                <Link
                  href="/me/rentout"
                  onClick={handleAction}
                  className="uppercase underline decoration-4 text-pink-300 decoration-pink-500 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                >
                  Rent Out
                </Link>
                <span>NFTs.</span>
              </div>
              <p className="text-xl py-6 bg-gradient-to-r from-blue-300 to-green-300 hover:from-yellow-300 hover:to-pink-300 bg-clip-text text-transparent">
                <em>Carry Renft</em> is a Secure and User-Friendly NFT Rental
                Marketplace.
              </p>
            </div>
          </div>
        </div>

        {/* 热门 NFT 展示 */}
        <div>
          <div className="flex gap-12">
            {hotNFTs.map((item) => (
              <div
                key={item.name}
                className="cursor-pointer card hover:border-primary-500  hover:border hover:bg-primary-500 hover:-translate-y-1 hover:scale-110 duration-300 bg-white/20"
              >
                <figure>
                  <Image
                    src={item.image}
                    alt=""
                    width={800}
                    height={400}
                    priority={false}
                  />
                </figure>
                <div className="card-body">
                  <div className="card-actions ">{item.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
