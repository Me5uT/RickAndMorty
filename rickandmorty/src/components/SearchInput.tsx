/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Space, Spin } from "antd";
import React from "react";
import { useStore } from "../store/store";
export type Page = {
  offset: number;
  limit: number;
};
export const SearchInput: React.FC = () => {
  const loading = useStore((state: any) => state.loading);
  console.log("🚀 ~ loading:", loading);
  const setLoading = useStore((state: any) => state.setLoading);
  const searchCharacter = useStore((state: any) => state.searchCharacter);
  const loadMore = useStore((state: any) => state.loadMore);
  const characters = useStore((state: any) => state.characters);
  console.log("🚀 ~ characters:", characters);
  const totalCount = useStore((state: any) => state.totalCount);
  console.log("🚀 ~ totalCount:", totalCount);
  const currentPage = useStore((state: any) => state.currentPage);
  console.log("🚀 ~ currentPage:", currentPage);
  const query = useStore((state: any) => state.query);
  console.log("🚀 ~ query:", query);
  const errorMessage = useStore((state: any) => state.errorMessage);
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
              <div>{opt.data.name}</div>
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
