"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useAuthStore } from "src/stores/auth";
import { useRouter } from "next/navigation";
import { Chow, Chows } from "src/types/chow";
import Image from "next/image";

const Chows = () => {
  const { token } = useAuthStore();
  const [chows, setChows] = useState<Chows>();
  const [chow, setChow] = useState<Chow>();
  const { push } = useRouter();

  async function getChows(jwt: string) {

    const res = await fetch(
      "https://ciaochow.plusnarrative.biz/api/chows?populate=*",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: Chows = await res.json();
    setChows(data);
    return data;
  }

  const viewChow = useCallback(() => {
    setChow(chows?.data[Math.floor(Math.random() * chows.data.length)]);
  }, [chows]);

  useEffect(() => {
    if (token) {
      getChows(token);
    } else {
      push("/auth");
    }
  }, [token, push]);

  useEffect(() => {
    if (!chow && chows) {
      console.log('📢 [page.tßsx:51]', {chow, chows});
      viewChow();
    }
  }, [chows, chow, viewChow]);

  return (
    <div>
      {chow && (
        <Fragment key={chow.id}>
          <div id="default-carousel" className="relative" data-carousel="slide">
            {/* Carousel wrapper */}
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              {chow.attributes.Image.data.map((image) => (
                <div
                  key={`image-${image.id}`}
                  className=" duration-1500 ease-in-out"
                  data-carousel-item
                >
                  <Image
                    src={`https://ciaochow.plusnarrative.biz${image.attributes.url}`}
                    width={image.attributes.width}
                    height={image.attributes.height}
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt={image.attributes.name}
                  />
                </div>
              ))}
            </div>
            {/* Slider indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
              {chow.attributes.Image.data.map((image) => (
                <button
                  key={`button-${image.id}`}
                  type="button"
                  className="bg-neutral-300 rounded-full w-2 h-2"
                  aria-current="true"
                  aria-label="Slide 1"
                  data-carousel-slide-to={0}
                />
              ))}
            </div>
            {/* Slider controls */}
            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>

          <section className="bg-white rounded-t-3xl relative -top-5 px-5 py-7">
            <h2 className="font-semibold mb-5">
              {chow.attributes.Title}
              <Image
                width={24}
                height={24}
                src="/assets/favorite.svg"
                className="inline float-end"
                alt=""
              />
            </h2>
            <div className="pb-20">
              <div>
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                  <ul
                    className="flex flex-wrap -mb-px text-sm font-medium text-center"
                    id="default-tab"
                    data-tabs-toggle="#default-tab-content"
                    role="tablist"
                  >
                    <li className="me-2" role="presentation">
                      <button
                        className="inline-block p-4 border-b-2 rounded-t-lg"
                        id="description-tab"
                        data-tabs-target="#description"
                        type="button"
                        role="tab"
                        aria-controls="description"
                        aria-selected="true"
                      >
                        Description
                      </button>
                    </li>
                    <li className="me-2" role="presentation">
                      <button
                        className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        id="nutrition-tab"
                        data-tabs-target="#nutrition"
                        type="button"
                        role="tab"
                        aria-controls="nutrition"
                        aria-selected="false"
                      >
                        Nutrition
                      </button>
                    </li>
                  </ul>
                </div>
                <div id="default-tab-content">
                  <div
                    className=" p-4 rounded-lg dark:bg-gray-800"
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {chow.attributes.Description}
                    </p>
                  </div>
                  <div
                    className=" p-4 rounded-lg dark:bg-gray-800"
                    id="nutrition"
                    role="tabpanel"
                    aria-labelledby="nutrition-tab"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      This is some placeholder content
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}

      <div className="btn-panel bg-white fixed bottom-0 inset-x-0 p-5 rounded-3xl">
        <button
          onClick={viewChow}
          className="bg-primary text-white font-semibold text-lg w-full rounded-[10px] p-3"
        >
          Nah!
        </button>
      </div>
    </div>
  );
};
export default Chows;
