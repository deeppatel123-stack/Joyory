import React, { useState } from "react";
import { GitCommit, Sparkles, CheckCircle2, History, ArrowRight } from "lucide-react";
import { Badge } from "../common/Badge";

export const PreferenceGraph = ({ graphData, learnedPreferences = [] }) => {
  const nodes = graphData?.nodes || [];
  const [selectedNodeId, setSelectedNodeId] = useState("texture");

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[1] || nodes[0];
  const matchingLearnedPref = learnedPreferences.find(p =>
    p.trait.toLowerCase().includes(selectedNode?.label.toLowerCase()) ||
    p.category.toLowerCase().includes(selectedNode?.category?.toLowerCase() || "")
  );

  return (
    <div className="rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-6 shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C26D53]" />
            <span className="uppercase tracking-wider text-[10px] font-medium">
              Dynamic Preference Model
            </span>
          </div>
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Beauty Preference Graph
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Continuously updated based on searches, comparisons, and product feedback
          </p>
        </div>
        <Badge variant="accent" size="sm" className="self-start sm:self-auto">
          6 Connected Signals
        </Badge>
      </div>

      {/* Interactive Graph Canvas / Flow Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Graph Nodes Area */}
        <div className="lg:col-span-7 bg-stone-50/70 dark:bg-stone-950/40 rounded-xl p-5 border border-stone-200/60 dark:border-stone-800/80">
          <div className="text-[11px] font-medium text-stone-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Graph Nodes (Click to inspect)</span>
            <span className="text-stone-400 text-[10px]">Flow: Base → Learned</span>
          </div>

          {/* Connected Flow Visualization */}
          <div className="relative max-w-sm mx-auto space-y-4 py-2">
            {nodes.map((node, index) => {
              const isSelected = node.id === selectedNodeId;
              const isLearned = node.type === "learned";

              return (
                <div key={node.id} className="relative flex flex-col items-center">
                  {/* Node Button */}
                  <button
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full max-w-xs p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer relative z-10 ${
                      isSelected
                        ? "bg-white dark:bg-stone-900 border-[#C26D53] shadow-md ring-2 ring-[#C26D53]/20"
                        : "bg-white/80 dark:bg-stone-900/80 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                        {node.category}
                      </span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                        isLearned
                          ? "bg-[#C26D53]/10 text-[#C26D53]"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                      }`}>
                        {node.confidence}% Confidence
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        {node.label}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#C26D53] animate-pulse" />
                      )}
                    </div>
                  </button>

                  {/* Connecting Line Downward */}
                  {index < nodes.length - 1 && (
                    <div className="w-0.5 h-5 bg-stone-300 dark:bg-stone-700 my-0.5 relative">
                      <div className="absolute -bottom-1 -left-[3px] w-2 h-2 border-r-2 border-b-2 border-stone-400 dark:border-stone-500 rotate-45" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Node Detail Inspector Panel */}
        <div className="lg:col-span-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/40 dark:bg-stone-900/40 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider">
              Node Inspector
            </span>
            <Badge variant={selectedNode.type === "learned" ? "accent" : "neutral"} size="sm">
              {selectedNode.type === "learned" ? "Continuously Learned" : "Declared Base"}
            </Badge>
          </div>

          <div>
            <span className="text-xs text-stone-400">{selectedNode.category}</span>
            <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {selectedNode.label}
            </h4>
          </div>

          {/* Confidence bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-stone-500">Learning Confidence</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {selectedNode.confidence}%
              </span>
            </div>
            <div className="h-2 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C26D53] rounded-full transition-all duration-300"
                style={{ width: `${selectedNode.confidence}%` }}
              />
            </div>
          </div>

          {/* Learning Source Trail */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
              Learned from interactions:
            </span>
            <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
              {(matchingLearnedPref?.learnedFrom || [selectedNode.source]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Evolution Note */}
          {matchingLearnedPref?.evolution && (
            <div className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-medium text-stone-500 dark:text-stone-400">
                <History className="w-3 h-3 text-[#C26D53]" />
                <span>Recent Graph Evolution</span>
              </div>
              <p className="text-stone-700 dark:text-stone-300 italic">
                "{matchingLearnedPref.evolution}"
              </p>
            </div>
          )}

          <div className="pt-2 text-[11px] text-stone-400 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
            <span>Last refined:</span>
            <span className="font-medium text-stone-700 dark:text-stone-300">
              {selectedNode.updated}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
