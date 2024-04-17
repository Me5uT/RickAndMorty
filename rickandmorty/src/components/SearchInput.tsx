/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Space, Spin } from "antd";
import React from "react";
import { useStore } from "../store/store";
import { BoldCertainLetters } from "./BoldCertainLetters";

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
    setQuery,
  } = useStore((state: any) => state);
  console.log("🚀 ~ query:", query);

  return (
    <div>
      <Select
        mode={"multiple"}
        placeholder={"Search ..."}
        style={{ width: "250px" }}
        filterOption={false}
        showSearch
        notFoundContent={<div>{errorMessage}</div>}
        options={characters.map((char: any) => ({
          key: char.id,
          value: char.name,
          label: char.name,
          episode: char.episode,
          image: char.image,
        }))}
        onSearch={(v: string) => {
          searchCharacter(v.toLowerCase());
          setQuery(v.toLowerCase());
        }}
        onClear={() => {
          searchCharacter("", 1);
        }}
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
          <Space key={`${opt.data.key}${opt.data.name}`} direction="horizontal">
            <img src={opt.data.image} width={35} />
            <Space direction="vertical">
              <BoldCertainLetters
                text={opt.data.label}
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
