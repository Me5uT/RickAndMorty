/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Space, Spin } from "antd";
import React from "react";
import { useStore } from "../store/store";
import { BoldCertainLetters } from "./BoldCertainLetters";
export type Page = {
  offset: number;
  limit: number;
};
export const SearchInput: React.FC = () => {
  const {
    errorMessage,
    query,
    currentPage,
    totalCount,
    characters,
    loadMore,
    loading,
    setLoading,
    searchCharacter,
  } = useStore((state: any) => state);
  console.log("🚀 ~ loading:", loading);
  console.log("🚀 ~ characters:", characters);
  console.log("🚀 ~ totalCount:", totalCount);
  console.log("🚀 ~ currentPage:", currentPage);
  console.log("🚀 ~ query:", query);
  console.log("🚀 ~ errorMessage:", errorMessage);

  return (
    <div>
      <Select
        mode={"multiple"}
        style={{ width: "250px" }}
        filterOption={false}
        showSearch
        options={characters}
        onSearch={(v: string) => {
          searchCharacter(v);
        }}
        notFoundContent={<div>{errorMessage}</div>}
        onPopupScroll={async (e: any) => {
          e.persist();
          const { target } = e;
          if (
            (target as any).scrollTop + (target as any).offsetHeight ===
            (target as any).scrollHeight
          ) {
            // if not load all;
            if (characters.length < totalCount) {
              setLoading(true);

              await loadMore(currentPage + 1);

              setLoading(false);
            }
          }
        }}
        dropdownRender={(menu) => (
          <>
            {menu}
            {loading ? (
              <Spin size="small" style={{ padding: "0 12px" }} />
            ) : null}
          </>
        )}
        optionRender={(opt) => (
          <Space direction="horizontal">
            <img src={opt.data.image} width={35} />
            <Space direction="vertical">
              <BoldCertainLetters
                text={opt.data.name}
                boldLetters={query.split("")}
              />
              <div>
                {`${opt.data.episode.length} ${
                  opt.data.episode.length > 1 ? "Episodes" : "Episode"
                }`}
              </div>
            </Space>
          </Space>
        )}
      />
    </div>
  );
};
