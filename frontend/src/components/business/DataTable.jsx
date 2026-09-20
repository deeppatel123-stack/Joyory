import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import { Input } from "../common/Input";

export const DataTable = ({
  columns,
  data,
  searchPlaceholder = "Search records...",
  searchKey = "name",
  filters = []
}) => {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredData = useMemo(() => {
    let result = [...data];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(item => {
        const val = item[searchKey];
        return val && String(val).toLowerCase().includes(q);
      });
    }

    if (selectedFilter !== "All") {
      result = result.filter(item => item.category === selectedFilter);
    }

    if (sortKey) {
      result.sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];

        if (typeof valA === "string") {
          return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortOrder === "asc" ? valA - valB : valB - valA;
      });
    }

    return result;
  }, [data, search, searchKey, selectedFilter, sortKey, sortOrder]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 shadow-2xs overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-72">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            icon={Search}
            className="text-xs"
          />
        </div>

        {filters.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {["All", ...filters].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                  selectedFilter === f
                    ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-950/30 text-stone-500 dark:text-stone-400">
              {columns.map((col) => (
                <th
                  key={col.key || col.header}
                  className={`p-3.5 font-medium ${col.sortable ? "cursor-pointer select-none hover:text-stone-900 dark:hover:text-stone-200" : ""}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-stone-400">
                        {sortKey === col.key ? (
                          sortOrder === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                        ) : (
                          <ArrowUpDown className="w-2.5 h-2.5 opacity-50" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-stone-400">
                  No matching records found.
                </td>
              </tr>
            ) : (
              filteredData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  className="hover:bg-stone-50/70 dark:hover:bg-stone-800/30 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key || col.header} className="p-3.5 text-stone-800 dark:text-stone-200">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t border-stone-200/80 dark:border-stone-800/80 bg-stone-50/30 dark:bg-stone-950/10 flex items-center justify-between text-[11px] text-stone-400">
        <span>Showing {filteredData.length} records</span>
        <span>Joyory Product Intelligence</span>
      </div>
    </div>
  );
};
